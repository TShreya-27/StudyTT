import React from "react";
import logo from "./logo.png";
import "./App.css";
import Homepage from "./Homepage";
import Timetable from "./Timetable";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to={Homepage}>
          <img src={logo} alt="Time-Table Icon" width="150" height="60" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ color: "white" }}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={Homepage}
                style={{ color: "white" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={Timetable}
                className="nav-link active"
                style={{ color: "white" }}
              >
                Generate Time-Table
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
