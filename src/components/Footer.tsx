import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-rose-50 via-amber-50 to-orange-50 text-gray-700 border-t border-gray-200 mt-10">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div className="flex flex-col space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">Bovita Candles</h2>
          <p className="text-gray-600 text-sm">
            Handcrafted candles for every mood and occasion. Bring warmth and light to your home.
          </p>
          <div className="flex space-x-3 mt-2 text-gray-700">
            <a href="#" className="hover:text-rose-600 transition"><FiFacebook size={20} /></a>
            <a href="#" className="hover:text-rose-600 transition"><FiInstagram size={20} /></a>
            <a href="#" className="hover:text-rose-600 transition"><FiTwitter size={20} /></a>
            <a href="#" className="hover:text-rose-600 transition"><FiMail size={20} /></a>
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-gray-900">Quick Links</h3>
          <Link to="/" className="hover:text-rose-600 transition">Home</Link>
          <Link to="/products" className="hover:text-rose-600 transition">Products</Link>
          <Link to="/about" className="hover:text-rose-600 transition">About</Link>
          <Link to="/contact" className="hover:text-rose-600 transition">Contact</Link>
        </div>

        {/* CUSTOMER CARE */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-gray-900">Customer Care</h3>
          <Link to="#" className="hover:text-rose-600 transition">FAQ</Link>
          <Link to="#" className="hover:text-rose-600 transition">Shipping & Returns</Link>
          <Link to="#" className="hover:text-rose-600 transition">Privacy Policy</Link>
          <Link to="#" className="hover:text-rose-600 transition">Terms & Conditions</Link>
        </div>

        {/* CONTACT */}
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-gray-900">Contact</h3>
          <p className="text-gray-600 text-sm">123 Candle St, Cozy Town, Country</p>
          <p className="text-gray-600 text-sm">+94 77 123 4567</p>
          <p className="text-gray-600 text-sm">info@bovitacandles.com</p>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-200 mt-8 py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Bovita Candles. All rights reserved.
      </div>
    </footer>
  );
}
