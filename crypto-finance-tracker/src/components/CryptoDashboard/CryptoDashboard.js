import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./CryptoDashboard.css";

Chart.register(...registerables);

export default function CryptoDashboard() {
  const [crypto, setCrypto] = useState("bitcoin");
  const [price, setPrice] = useState(null);
  const [insight, setInsight] = useState("Fetching AI insights...");
  const [history, setHistory] = useState([45000, 46000, 44000, 47000, 45500, 46500]); // Mock initial data

  useEffect(() => {
    fetchCryptoData();
  }, [crypto]);

  const fetchCryptoData = async () => {
    // Simulate data for demo purposes
    const mockPrices = {
      bitcoin: 45000,
      ethereum: 3000,
      dogecoin: 0.15
    };
    try {
      setPrice("Loading...");
      setInsight("Fetching insights...");
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockPrice = mockPrices[crypto.toLowerCase()] || 1000;
      setPrice(mockPrice);
      setHistory(prev => [...prev.slice(-5), mockPrice + Math.random() * 1000 - 500]);
      setInsight(`${crypto.toUpperCase()} is showing interesting price movements. Consider monitoring market trends.`);
    } catch (error) {
      setPrice("Error fetching price");
      setInsight("Unable to fetch market insights at the moment.");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="crypto-dashboard">
      <div className="input-section">
        <input
          type="text"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value.toLowerCase())}
          placeholder="Enter crypto name (e.g., bitcoin, ethereum)"
          className="crypto-input"
        />
        <button onClick={fetchCryptoData} className="fetch-button">
          Fetch Data
        </button>
      </div>

      <div className="crypto-card">
        <h2>{crypto.toUpperCase()}</h2>
        <p className="price">Price: ${price || "Loading..."}</p>
        <p className="insight">{insight}</p>
      </div>

      <div className="chart-container">
        <Line
          data={{
            labels: Array.from({ length: history.length }, (_, i) => `${2020 + i}`),
            datasets: [
              {
                label: "",
                data: history,
                borderColor: "var(--primary)",
                backgroundColor: "var(--primary)",
                fill: false,
                tension: 0.4
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                ticks: {
                  color: 'var(--accent)'
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              },
              x: {
                ticks: {
                  color: 'var(--accent)'
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)'
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
