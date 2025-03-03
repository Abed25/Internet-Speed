import React, { useState } from "react";
import axios from "axios";
import "../styles/SpeedTest.css"; // Import CSS

const SpeedTest = () => {
  const [speed, setSpeed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSpeedTest = async () => {
    setLoading(true);
    setSpeed(null);
    setError(null); // Reset state

    try {
      console.log("Fetching speed test data...");
      const response = await axios.get("http://127.0.0.1:8000/speedtest");
      console.log("Response received:", response.data);

      setSpeed(response.data);
    } catch (error) {
      console.error("Error fetching speed test data:", error);
      setError("Failed to get speed test data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="myName">superDev</h2>
      <div className="card">
        <h1 className="title">Internet Speed Test</h1>

        <button onClick={handleSpeedTest} className="button" disabled={loading}>
          {loading ? "Testing..." : "Run Speed Test"}
        </button>

        {loading && <div className="loader"></div>}

        {error && <p className="error-message">{error}</p>}

        {speed && (
          <div className="result-container">
            <p className="result-text">
              📥 Download Speed:{" "}
              <span className="download-speed">
                {speed.download_speed} Mbps
              </span>
            </p>
            <p className="result-text">
              📤 Upload Speed:{" "}
              <span className="upload-speed">{speed.upload_speed} Mbps</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedTest;
