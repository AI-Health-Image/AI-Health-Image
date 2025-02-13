import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import useStore from "../components/jwtStore";

function LoginPage() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { setJwt, /*getJwt*/ } = useStore();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // Schickt die Daten an die Backend API
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Prüft den Response von der API
    if (response.ok === false) {
      const error = await response.json();
      setErrorMessage(error.message);
      return;
    }
    const data = await response.json();
    setSuccessMessage(data.message);

    //JWT Token wird hier weiterverarbeitet
    //console.log("Token:", data.token);
    // Speichert den Token im LocalStorage
    setJwt(data.token);
    //console.log("JWT:", getJwt());

    // Weiterleitung auf die Startseite
    navigate("/");
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

          <h1 className="text-xl mx-auto">Login</h1>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="border p-2 bg-white"
            placeholder="Email Adresse"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border p-2 bg-white"
            placeholder="Password"
          />
          <div className="flex gap-2">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <button
            type="submit"
            className="bg-slate-500 px-4 py-2 text-white font-semibold"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between">
          <Link to="/register">Dont have an Account?</Link>
          <Link to="/login">Forgot Password</Link>
        </div>
      </div>
    </Layout>
  );
}

export default LoginPage;
