import { Route, Routes } from "react-router";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Sidebar from "./components/shared/Sidebar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CheckoutScreen from "./pages/Checkout";
import PaymentScreen from "./pages/PaymentScreen";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/AdminDashboard/Dashboard";
// import CustomersList from "./pages/AdminDashboard/CustomersList";

function App() {
  return (
    <div className="overflow-hidden">
      {/* Common Header */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckoutScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />

        {/* Admin Routes with AdminLayout */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="customers" element={<CustomersList />} />{" "} */}
          {/* Add customer list route */}
          {/* Add more admin routes as needed */}
        </Route>
      </Routes>

      <Sidebar />
      <Footer />
    </div>
  );
}

export default App;
