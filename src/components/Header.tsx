import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";


export default function Header() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleUserClick = () => {
    if (!user) {
        navigate("/login")
    } else if (user.role === "ADMIN") {
        navigate("/dashboard/admin")
    } else {
        navigate("/dashboard/user")
    }
  }

  return (
    <header className="w-full shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Bovita Candles
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-black">Home</Link>
          <Link to="/products" className="hover:text-black">Products</Link>
          <Link to="/about" className="hover:text-black">About</Link>
          <Link to="/contact" className="hover:text-black">Contact</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4 text-gray-700 text-xl">
          <FiSearch className="cursor-pointer hover:text-black" />
          <FiUser
            className="cursor-pointer hover:text-black"
            onClick={handleUserClick}
          />
          <FiShoppingCart className="cursor-pointer hover:text-black" />
        </div>
      </div>
    </header>
  )
}
