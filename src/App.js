import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Register from "./pages/Register";
import AdminOrders from "./pages/AdminOrders";
import AdminPizzas from "./pages/AdminPizzas";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import AdminCoupons from "./pages/AdminCoupons";
import AdminUsers from "./pages/AdminUsers";
import AdminDrivers from "./pages/AdminDrivers";

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        {/* Admin */}
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/pizzas" element={<AdminPizzas />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/coupons" element={<AdminCoupons />} />
        <Route path="/admin/drivers" element={<AdminDrivers />} />


        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
