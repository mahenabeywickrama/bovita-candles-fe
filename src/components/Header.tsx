import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FiUser, FiShoppingCart, FiHeart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "../context/cartContext";
import { useState } from "react";
import Cart from "./Cart";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleUserClick = () => {
    if (!user) navigate("/login");
    else if (user.role === "ADMIN") navigate("/dashboard/admin");
    else navigate("/dashboard/user");
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-md transition">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-gray-800 hover:text-rose-600 transition">
            Bovita Candles
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-rose-600 transition ${
                  location.pathname === link.path ? "text-rose-600 font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-5 text-gray-700 text-xl">

            {/* Wishlist */}
            <FiHeart className="cursor-pointer hover:text-rose-600 transition" />

            {/* User */}
            <FiUser
              className="cursor-pointer hover:text-rose-600 transition"
              onClick={handleUserClick}
            />

            {/* Cart */}
            <div
              className="relative cursor-pointer hover:text-rose-600 transition"
              onClick={() => setCartOpen(true)}
            >
              <FiShoppingCart className={totalItems > 0 ? "animate-pulse" : ""} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md px-6 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-rose-600 transition ${
                  location.pathname === link.path ? "text-rose-600 font-semibold" : "text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
