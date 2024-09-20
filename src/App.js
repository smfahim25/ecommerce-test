import { Routes } from "react-router";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <div className="overflow-hidden">
      <Header />
      <div className="min-h-[83vh]">
        <Routes></Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
