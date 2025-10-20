import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            eFolio
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link class="nav-link active" to="/">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h1>Welcome to ePortfolio</h1>

        <h1 style={{ fontSize: "15px" }}>
          ePortfolio is a web-based application that enables users—students,
          faculty, and others, to create, manage, and share digital portfolios
          via a portable URL
        </h1>

        <div className="container mt-4">
          <div className="row">
            <div className="col-6">
              <div className="card" style={{ width: "35rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Register</h5>
                  <p className="card-text">
                    New to Efolio? Create an account to get started
                  </p>
                  <button onClick={handleRegisterClick}>
                    Click here to register
                  </button>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card" style={{ width: "35rem" }}>
                <div className="card-body">
                  <h5 className="card-title">Login</h5>
                  <p className="card-text">
                    Already have an Efolio account? Log in here.
                  </p>
                  <button onClick={handleLoginClick}>
                    Click here to login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
