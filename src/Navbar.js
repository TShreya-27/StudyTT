import React from "react";
import logo from "./logo.png";
import "./App.css";
import Homepage from "./Homepage";
import Timetable from "./Timetable";
export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="Time-Table Icon"
            href={Homepage}
            width="150"
            height="60"
          />
        </a>
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
              <a
                className="nav-link active"
                aria-current="page"
                href="Homepage.js"
                style={{ color: "white" }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                href={Timetable}
                style={{ color: "white" }}
              >
                Generate Time-Table
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
