import React from "react";
import "../interfaceSettings.css";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

// This is a "dumb" component for the UI.
// It receives all data and functions as props from LoginPage.
const LoginForm = ({ formData, handleInputChange, handleSubmit, error }) => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            eFolio
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" to="/">
                  About Us
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <h2>Login to Your Account</h2>

        <Form onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}

          <div class="row">
            <div class="col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div class="col">
              <label htmlFor="name">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Password"
              />
            </div>
          </div>

          <Button variant="success" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
