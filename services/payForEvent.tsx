import RazorpayCheckout from "react-native-razorpay";

export async function payForEvent(eventId: number, token: string) {
  const orderRes = await fetch(
    "https://smashlive-omega.vercel.app/api/registrations/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({ eventId }),
    }
  );
  const order = await orderRes.json();
  if (!orderRes.ok) throw new Error(order.error || "Order creation failed");

  const options = {
    key: order.keyId,
    amount: order.amount,
    currency: order.currency,
    name: "Smash Live",
    description: order.eventTitle,
    order_id: order.orderId,
    theme: { color: "#0F766E" },
  };

  const payment = await RazorpayCheckout.open(options);

  const verifyRes = await fetch(
    "https://smashlive-omega.vercel.app/api/registrations/verify-payment",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify({
        registrationId: order.registrationId,
        razorpay_order_id: payment.razorpay_order_id,
        razorpay_payment_id: payment.razorpay_payment_id,
        razorpay_signature: payment.razorpay_signature,
      }),
    }
  );

  const verified = await verifyRes.json();
  if (!verifyRes.ok) throw new Error(verified.error || "Verification failed");

  return verified;
}
