import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

function RegisterPage() {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    // check if is valid email address
    if (
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) === false
    ) {
      setEmailError("Invalid email address");
      return;
    }
    const password = formData.get("password");
    const passwordRetype = formData.get("password-retype");

    // check if password and passwordretype match
    if (password !== passwordRetype) {
      setPasswordError("Passwords do not match");
      return;
    }

    const response = await fetch(import.meta.env.VITE_API_URL + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, repeatPassword: passwordRetype }),
    });

    if (response.ok === false) {
      const error = await response.json();
      setErrorMessage(error.errors);
      return;
    }

    const data = await response.json();
    setSuccessMessage(data.message);

    setEmailError(null);
    setPasswordError(null);
    navigate("/login");
  }
  return (
    <Layout>
      <div className="container mx-auto max-w-md p-4 bg-gray-100 mt-4 rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {successMessage && (
            <p className="bg-green-500 text-white p-2">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="bg-red-500 text-white p-2">{errorMessage}</p>
          )}
          <h1 className="text-xl mx-auto">Register</h1>
          <label htmlFor="register-email">Email</label>
          <input
            type="email"
            id="register-email"
            name="email"
            className="border p-2 bg-white"
            placeholder="Email Adresse"
          />
          {emailError && <p className="text-red-500">{emailError}</p>}
          <label htmlFor="register-password">Password</label>
          <input
            type="password"
            id="register-password"
            name="password"
            className="border p-2 bg-white"
            placeholder="Password"
            minLength="8"
            maxLength="24"
          />
          <label htmlFor="register-password-retype">Retype Password</label>
          <input
            type="password"
            id="register-password-retype"
            name="password-retype"
            className="border p-2 bg-white"
            placeholder="Password retype"
          />
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          <button
            type="submit"
            className="bg-slate-500 px-4 py-2 text-white font-semibold cursor-pointer"
          >
            Register
          </button>
        </form>
        <Link to="/login">Back to Login</Link>
      </div>
    </Layout>
  );
}

export default RegisterPage;
