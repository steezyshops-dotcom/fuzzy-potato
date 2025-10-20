import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AccountHomePage from "./pages/AccountHomePage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/*Protect /account route */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountHomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

