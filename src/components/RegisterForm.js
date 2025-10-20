import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../interfaceSettings.css"; // importing the global CSS file
import { Link } from "react-router-dom";
// the dumb component
const RegisterForm = ({ formData, handleInputChange, handleSubmit, error }) => {
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

      <div className="form-container">
        <h2>Create Your Account</h2>

        <Form onSubmit={handleSubmit}>
          {/* This will display any error message from the backend */}
          {error && <Alert variant="danger">{error}</Alert>}

          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="role">Role</label>
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
            >
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Coordinator">Coordinator</option>
            </select>
            <br></br>
          </div>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength="6"
            />
            <p>Password must be at least 6 characters long.</p>
          </div>

          <Button
            variant="success"
            type="submit"
            className="btn btn-primary btn-lg"
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
