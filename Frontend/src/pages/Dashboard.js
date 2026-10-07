import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await api.get("/api/incidents");
        setIncidents(response.data);
      } catch (error) {
        console.error("Error fetching incidents:", error);
        setError("Unable to load incidents.");
      }
    };

    fetchIncidents();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ margin: "40px" }}>
      <h2>CSDF Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <div style={{ marginTop: "20px" }}>
        <Link to="/report">
          <button>Report Incident</button>
        </Link>

        {" "}

        <Link to="/analysis">
          <button>File Analysis</button>
        </Link>
      </div>

      <h3>Recent Incidents</h3>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {incidents.length === 0 && !error ? (
        <p>No incidents reported yet.</p>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li key={incident._id}>
              <b>{incident.title}</b>
              {" - "}
              {incident.description}
              {" "}
              <i>
                ({incident.reportedBy}) [
                {new Date(
                  incident.date
                ).toLocaleString()}
                ]
              </i>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}