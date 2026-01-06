import Header from "./Header"
import { Outlet, useLocation } from "react-router-dom"

function Layout() {
  const location = useLocation()
  const authPages = ["/login", "/register"]
  const isAuthPage = authPages.includes(location.pathname)
  const isMainPage = location.pathname === "/" || location.pathname === "/products"

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main
        className={
          isAuthPage
            ? "flex-1 flex items-center justify-center px-4"
            : isMainPage
            ? "flex-1 w-full"
            : "flex-1 container mx-auto p-4"
        }
      >
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
