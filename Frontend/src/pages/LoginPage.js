import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (registerMode) {
        await api.post("/api/auth/register", {
          username,
          password,
        });

        setMessage("Registration successful! Please login.");
        setRegisterMode(false);
        setPassword("");
      } else {
        const response = await api.post("/api/auth/login", {
          username,
          password,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "isAdmin",
          response.data.isAdmin
        );

        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>
        {registerMode
          ? "Create Account"
          : "CSDF Login"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          textAlign: "left",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <br />
        <br />

        <button type="submit">
          {registerMode ? "Register" : "Login"}
        </button>
      </form>

      <br />
      <br />

      <button
        onClick={() => {
          setRegisterMode(!registerMode);
          setMessage("");
        }}
      >
        {registerMode
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>

      {message && (
        <p
          style={{
            color: "red",
            marginTop: "15px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}