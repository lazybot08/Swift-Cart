//import css
import "./App.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
//imports for browser router
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
//importing components
import RootLayout from "./components/layout/RootLayout/RootLayout"
import Home from "./pages/Home/Home"
import Products from "./pages/Products/Products"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Login from "./components/auth/Login-Container/Login"
import Register from "./components/auth/Register-Container/Register"
import ProductDetail from "./components/layout/ProductsLayout/ProductDetail/ProductDetail"
import RestrictedRoute from "./routes/RestrictedRoutes"
import PrivateRoute from "./routes/PrivateRoutes"
import Dashboard from "./components/layout/DashboardLayout/Dashboard"
import PublicRoute from "./routes/PublicRoutes"
import Logout from "./components/auth/Logout-Container/Logout";
import ForgotPassword from "./components/auth/Forgot-Password-Container/ForgotPassword";
import ResetPassword from "./components/auth/ResetPasswordContainer/ResetPassword";

const navRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} >
      <Route element={<PublicRoute />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path={`product/:id`} element={<ProductDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path='logout' element={<Logout />} />
      </Route>
      <Route element={<RestrictedRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="resetPassword/:token" element= {<ResetPassword />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='dashboard' element={<Dashboard />} />
      </Route>
    </Route>
  )
  )
  function App() {
    return (
      <div className="appContainer">
      <div className="root-layout-container">
        <RouterProvider router={navRouter} />
      </div>
    </div>
  )
}
export default App;
