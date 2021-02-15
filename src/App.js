import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";

import './App.css'
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/*" element={<Login />} />
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
