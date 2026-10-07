import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function IncidentReport() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/api/incidents",
        {
          title,
          description,
          reportedBy: "User",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Incident reported successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error reporting incident:", error);

      setMessage(
        error.response?.data?.error ||
          "Error reporting incident."
      );
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <h2>Report Incident</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Incident Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br />
        <br />

        <textarea
          placeholder="Incident Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          required
          rows="6"
          cols="40"
        />

        <br />
        <br />

        <button type="submit">
          Report Incident
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px" }}>
          {message}
        </p>
      )}

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}