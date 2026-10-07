import React, { useState } from "react";
import api from "../api";

export default function FileAnalysis() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setResult("");
    setError("");

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        "/api/files/upload",
        formData
      );

      setResult(
        `Filename: ${response.data.filename}, SHA256: ${response.data.sha256}`
      );
    } catch (error) {
      console.error("File upload error:", error);

      setError(
        error.response?.data?.error ||
          "Error uploading or analyzing file."
      );
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <h2>File Analysis (Digital Forensics)</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <br />
        <br />

        <button type="submit">
          Upload & Analyze
        </button>
      </form>

      {result && (
        <p style={{ marginTop: "20px" }}>
          {result}
        </p>
      )}

      {error && (
        <p
          style={{
            color: "red",
            marginTop: "20px",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}