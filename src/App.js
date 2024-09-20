import { Navigate, Route, Routes } from "react-router";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Sidebar from "./components/shared/Sidebar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CheckoutScreen from "./pages/Checkout";
import PaymentScreen from "./pages/PaymentScreen";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/AdminDashboard/Dashboard";
import CustomersList from "./pages/AdminDashboard/Customer/CustomerList";
import CustomerDetail from "./pages/AdminDashboard/Customer/CustomerDetails";
import AddCustomer from "./pages/AdminDashboard/Customer/AddCustomer";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import OrderList from "./pages/AdminDashboard/Orders/Orders";
import OrderDetail from "./pages/AdminDashboard/Orders/OrdersDetails";
import ProductList from "./pages/AdminDashboard/Products/Products";
import ProductDetail from "./pages/AdminDashboard/Products/ProductDetails";
import AddProduct from "./pages/AdminDashboard/Products/AddProduct";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";

function App() {
  return (
    <div className="overflow-hidden">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckoutScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />

        <Route path="/admin/*" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="customers" element={<CustomersList />} />
          <Route path="customers/:id" element={<CustomerDetail />} />
          <Route path="customers/add" element={<AddCustomer />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Sidebar />
      <Footer />
    </div>
  );
}

export default App;
