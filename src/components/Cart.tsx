import { FiX, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-full sm:w-96 h-full z-50 flex flex-col bg-white/90 backdrop-blur-lg shadow-2xl"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
              <button
                className="text-gray-600 hover:text-gray-900 transition"
                onClick={onClose}
              >
                <FiX size={24} />
              </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center mt-20">
                  Your cart is empty
                </p>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.product._id}
                    layout
                    className="flex gap-4 mb-6 border-b pb-4 items-center"
                  >
                    <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-2xl shadow-sm">
                      <img
                        src={item.product.imageUrls[0]}
                        className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                        alt={item.product.title}
                      />
                    </div>

                    <div className="flex-1 flex flex-col gap-1">
                      <h3 className="font-semibold text-gray-900">{item.product.title}</h3>
                      <p className="text-gray-600 text-sm">Rs. {item.product.price}</p>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          className="px-3 py-1 border rounded-full hover:bg-gray-100 transition"
                          onClick={() =>
                            updateQuantity(
                              item.product._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        >
                          −
                        </button>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">{item.quantity}</span>
                        <button
                          className="px-3 py-1 border rounded-full hover:bg-gray-100 transition"
                          onClick={() =>
                            updateQuantity(item.product._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      className="text-red-500 hover:text-red-600 transition"
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* FOOTER */}
            {cart.length > 0 && (
              <div className="border-t p-4 sticky bottom-0 bg-white/90 backdrop-blur-md flex flex-col gap-3">
                <div className="flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>Rs. {total}</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    navigate("/checkout");
                  }}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
