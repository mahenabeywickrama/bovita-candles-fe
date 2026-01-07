import { useState, type FormEvent } from "react"
import { register } from "../services/auth"
import { useNavigate, Link } from "react-router-dom"
import { FiLoader } from "react-icons/fi"

export default function Register() {
  const navigate = useNavigate()

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleRgister = async (e: FormEvent) => {
    e.preventDefault()

    if (!firstname || !lastname || !email || !password || !conPassword) {
      setError("All fields are required")
      return
    }

    if (password !== conPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      setLoading(true)
      setError("")

      const obj = {
        firstname,
        lastname,
        email,
        password,
        role: "USER"
      }

      const res: any = await register(obj)

      alert(`Registration successful! Email: ${res?.data?.email}`)
      navigate("/login")
    } catch (err) {
      console.error(err)
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-rose-50 via-amber-50 to-orange-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg md:max-w-xl animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900">
          Create an Account
        </h1>

        {error && (
          <p className="mb-4 text-center text-red-600 font-medium">{error}</p>
        )}

        <form onSubmit={handleRgister}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="p-4 border rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="p-4 border rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-full p-4 border rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-4 border rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={conPassword}
              onChange={(e) => setConPassword(e.target.value)}
              className="p-4 border rounded-xl focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600
              text-white font-semibold rounded-xl shadow-lg
              hover:scale-105 hover:from-pink-600 hover:to-rose-600
              transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" />
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-rose-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
