import "./App.css";
import React from "react";
import Navbar from "./Navbar.js";
import Homepage from "./Homepage.js";
import Footer from "./Footer.js";
export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Homepage />
      <Footer />
    </div>
  );
}
