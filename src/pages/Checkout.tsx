import { useCart } from "../context/cartContext";
import { useState } from "react";
import { createOrder } from "../services/order";

export default function Checkout() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      setLoading(true);

      const orderPayload = {
        items: cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
        shippingInfo,
        paymentMethod,
        totalAmount: total,
      };

      const res = await createOrder(orderPayload);
      const orderId = res.data._id;

      if (paymentMethod === "card") {
        const paymentRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/payments/payhere/${orderId}`,
          { method: "POST" }
        );

        const paymentData = await paymentRes.json();

        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://sandbox.payhere.lk/pay/checkout";

        Object.entries(paymentData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
        return;
      }

      clearCart();
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !submitted)
    return (
      <p className="p-10 text-center text-gray-600 text-lg">
        Your cart is empty. Add some products before checkout.
      </p>
    );

  if (submitted)
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="text-gray-700 mb-4">
          Your order has been placed successfully.
        </p>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT: Order Summary */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
          <div className="bg-white/90 backdrop-blur-sm border rounded-3xl p-6 space-y-4 shadow-lg">
            {cart.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-4 items-center border-b pb-3"
              >
                <img
                  src={item.product.imageUrls[0]}
                  className="w-20 h-20 object-cover rounded-2xl shadow-sm"
                  alt={item.product.title}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.product.title}</h3>
                  <p className="text-gray-600">Rs. {item.product.price}</p>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.product._id, Number(e.target.value))
                  }
                  className="w-16 border px-2 py-1 rounded-lg text-center focus:ring-2 focus:ring-rose-300"
                />
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="text-right font-bold text-xl text-gray-900 pt-2">
              Total: Rs. {total}
            </div>
          </div>
        </div>

        {/* RIGHT: Shipping Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h2>
          <form
            className="bg-white/90 backdrop-blur-sm border rounded-3xl p-6 shadow-lg space-y-6"
            onSubmit={handleSubmit}
          >
            {/* Grouped Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleInputChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-300"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleInputChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-300"
              />
            </div>

            <input
              name="address"
              placeholder="Address"
              onChange={handleInputChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-300"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                name="city"
                placeholder="City"
                onChange={handleInputChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-300"
              />
              <input
                name="postalCode"
                placeholder="Postal Code"
                onChange={handleInputChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-300"
              />
              <input
                name="country"
                placeholder="Country"
                onChange={handleInputChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-300"
              />
            </div>

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-300"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit / Debit Card</option>
            </select>

            {/* Optional card info note */}
            {paymentMethod === "card" && (
              <p className="text-sm text-gray-600 italic">
                You will be redirected to PayHere to complete your payment.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-full font-semibold shadow-xl hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
