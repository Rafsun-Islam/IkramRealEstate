import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaLock, FaSignInAlt } from "react-icons/fa";

import { auth } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import "./AdminLogin.css";
import SEO from "../../components/SEO";
const AdminLogin = () => {
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(
        auth,
        formData.email.trim(),
        formData.password,
      );

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage("Invalid email or password. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login" path="/admin/login" noindex />
      <main className="admin-login">
        <div className="admin-login__card">
          <div className="admin-login__icon">
            <FaLock aria-hidden="true" />
          </div>

          <span>Admin Access</span>

          <h1>Login to Dashboard</h1>

          <p>
            Manage property projects, gallery images, and client inquiries from
            one secure dashboard.
          </p>

          <form className="admin-login__form" onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </div>

            {errorMessage && (
              <div className="admin-login__error">{errorMessage}</div>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <FaSignInAlt aria-hidden="true" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default AdminLogin;
