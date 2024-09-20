import { Route, Routes } from "react-router";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="overflow-hidden">
      <Header />
      <div className="min-h-[83vh]">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
