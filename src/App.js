import { Route, Routes } from "react-router";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Sidebar from "./components/shared/Sidebar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="overflow-hidden">
      <Header />
      <div className="min-h-[83vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />}></Route>
        </Routes>
      </div>
      <Sidebar />
      <Footer />
    </div>
  );
}

export default App;
