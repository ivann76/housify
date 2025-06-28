import React, { useEffect, useState } from "react";
import NavBar from '../components/NavBar';
import './History.css';
import BASE_URL from '../apiConfig';

const History = () => {
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [stats, setStats] = useState({
    total_predictions: 0,
    avg_predicted_price: 0,
    favorite_location: '',
    favorite_property_type: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load prediction history and stats from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch both history and stats
        const [historyResponse, statsResponse] = await Promise.all([
          fetch(`${BASE_URL}/history/predictions`),
          fetch(`${BASE_URL}/history/stats`)

        ]);

        if (historyResponse.ok) {
          const historyData = await historyResponse.json();
          setPredictionHistory(historyData);
        }

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load prediction history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const clearHistory = async () => {
    if (window.confirm("Are you sure you want to clear all prediction history?")) {
      try {
        const response = await fetch(`${BASE_URL}/history/predictions`, {
          method: 'DELETE'
        });

        if (response.ok) {
          setPredictionHistory([]);
          setStats({
            total_predictions: 0,
            avg_predicted_price: 0,
            favorite_location: 'None',
            favorite_property_type: 'None'
          });
        }
      } catch (err) {
        console.error("Error clearing history:", err);
        alert("Failed to clear history");
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriceCategory = (price) => {
    if (price < 500000) return 'Low';
    if (price < 1000000) return 'Mid';
    return 'High';
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Low': return '#10b981';
      case 'Mid': return '#f59e0b';
      case 'High': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <NavBar />
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 20px' }}>
        {/* Page Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
            Prediction History
          </h1>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Track your property price predictions and discover your search patterns
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #e5e5e5'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4287f5', marginBottom: '8px' }}>
              {stats.total_predictions}
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>Total Predictions</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #e5e5e5'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>
              {formatPrice(stats.avg_predicted_price)}
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>Average Predicted Price</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #e5e5e5'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '8px' }}>
              {stats.favorite_location}
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>Most Searched Location</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #e5e5e5'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '8px' }}>
              {stats.favorite_property_type}
            </div>
            <div style={{ fontSize: '16px', color: '#666' }}>Favorite Property Type</div>
          </div>
        </div>

        {/* Prediction History Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid #e5e5e5',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #e5e5e5',
            backgroundColor: '#f8fafc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#333',
              margin: 0
            }}>
              Recent Predictions
            </h3>
            {predictionHistory.length > 0 && (
              <button
                onClick={clearHistory}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                Clear History
              </button>
            )}
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #e5e5e5', color: '#374151', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #e5e5e5', color: '#374151', fontWeight: '600' }}>Location</th>
                  <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #e5e5e5', color: '#374151', fontWeight: '600' }}>Type</th>
                  <th style={{ padding: '16px', textAlign: 'left', borderBottom: '1px solid #e5e5e5', color: '#374151', fontWeight: '600' }}>Condition</th>
                  <th style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #e5e5e5', color: '#374151', fontWeight: '600' }}>Rooms</th>
                  <th style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #e5e5e5', color: '#374151', fontWeight: '600' }}>Size (sqm)</th>
                  <th style={{ padding: '16px', textAlign: 'right', borderBottom: '1px solid #e5e5e5', color: '#374151', fontWeight: '600' }}>Predicted Price</th>
                  <th style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #e5e5e5', color: '#374151', fontWeight: '600' }}>Category</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
                      Loading prediction history...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>
                      {error}
                    </td>
                  </tr>
                ) : predictionHistory.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
                      No predictions yet. Start predicting property prices to see your history here!
                    </td>
                  </tr>
                ) : (
                  predictionHistory.map((prediction, index) => {
                    const category = getPriceCategory(prediction.predicted_price);
                    return (
                      <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '16px', color: '#374151' }}>
                          {formatDate(prediction.created_at)}
                        </td>
                        <td style={{ padding: '16px', color: '#374151' }}>
                          {prediction.location}
                        </td>
                        <td style={{ padding: '16px', color: '#374151' }}>
                          {prediction.property_type}
                        </td>
                        <td style={{ padding: '16px', color: '#374151' }}>
                          {prediction.built_type}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center', color: '#374151' }}>
                          {prediction.rooms}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center', color: '#374151' }}>
                          {prediction.built_size?.toLocaleString()}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right', color: '#374151', fontWeight: '600' }}>
                          {formatPrice(prediction.predicted_price)}
                        </td>
                        <td style={{ padding: '16px', textAlign: 'center' }}>
                          <span style={{
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: 'white',
                            backgroundColor: getCategoryColor(category)
                          }}>
                            {category}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default History;