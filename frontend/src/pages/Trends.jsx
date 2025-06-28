import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import NavBar from '../components/NavBar';
import './Trends.css';
import BASE_URL from '../apiConfig';

const Trends = () => {
  const [avgPriceData, setAvgPriceData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [scatterData, setScatterData] = useState([]);

  // Load chart data from backend
  useEffect(() => {
    axios.get(`${BASE_URL}/chart/avg_price_by_type`)
      .then(res => setAvgPriceData(res.data))
      .catch(err => console.error("Error loading avg price:", err));

    axios.get(`${BASE_URL}/chart/listings_by_location`)
      .then(res => setLocationData(res.data))
      .catch(err => console.error("Error loading pie chart:", err));

    axios.get(`${BASE_URL}/chart/size_vs_price`)
      .then(res => setScatterData(res.data))
      .catch(err => console.error("Error loading scatter plot:", err));
  }, []);

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
            Property Market Trends
          </h1>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Comprehensive analysis of property prices and market distribution
          </p>
        </div>

        {/* Charts Container */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          {/* Average Price by Property Type */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '32px',
            border: '1px solid #e5e5e5',
            flex: '1 1 400px',
            minWidth: '320px',
            maxWidth: '600px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Average Price by Property Type
            </h3>
            <Plot
              data={[{
                x: avgPriceData.map(d => d["Property Type"]),
                y: avgPriceData.map(d => d.Price),
                type: 'bar',
                marker: {
                  color: '#4287f5',
                  line: { color: '#2563eb', width: 1 }
                },
              }]}
              layout={{
                xaxis: {
                  title: "Property Type",
                  titlefont: { size: 14, color: '#666' },
                  tickfont: { size: 12 }
                },
                yaxis: {
                  title: "Average Price (RM)",
                  titlefont: { size: 14, color: '#666' },
                  tickfont: { size: 12 }
                },
                margin: { t: 20, b: 80, l: 80, r: 20 },
                plot_bgcolor: '#fafafa',
                paper_bgcolor: 'white',
                responsive: true
              }}
              style={{ width: '100%', height: '400px' }}
            />
          </div>

          {/* Top 10 Locations by Listing Count */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '32px',
            border: '1px solid #e5e5e5',
            flex: '1 1 400px',
            minWidth: '320px',
            maxWidth: '600px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              Top 10 Locations by Listing Count
            </h3>
            <Plot
              data={[{
                values: locationData.map(d => d.Count),
                labels: locationData.map(d => d.Location),
                type: 'pie',
                hole: 0.3,
                textinfo: 'label+percent',
                textposition: 'outside',
                marker: {
                  colors: ['#4287f5', '#42f554', '#f54242', '#f5a442', '#a442f5',
                    '#42f5f5', '#f542f5', '#54f542', '#4254f5', '#f55442']
                }
              }]}
              layout={{
                showlegend: false,
                margin: { t: 20, b: 20, l: 20, r: 20 },
                paper_bgcolor: 'white',
                responsive: true
              }}
              style={{ width: '100%', height: '400px' }}
            />
          </div>
        </div>

        {/* Built Size vs Price */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          padding: '32px',
          border: '1px solid #e5e5e5',
          width: '100%',
          overflowX: 'auto'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            Built Size vs Price Correlation
          </h3>
          <Plot
            data={[{
              x: scatterData.map(d => d.Built_Size),
              y: scatterData.map(d => d.Price),
              mode: 'markers',
              type: 'scatter',
              marker: {
                size: 8,
                color: '#1f77b4',
                opacity: 0.7,
                line: { color: '#1565c0', width: 1 }
              }
            }]}
            layout={{
              xaxis: {
                title: "Built Size (sq ft)",
                titlefont: { size: 14, color: '#666' },
                tickfont: { size: 12 },
                gridcolor: '#e5e5e5'
              },
              yaxis: {
                title: "Price (RM)",
                titlefont: { size: 14, color: '#666' },
                tickfont: { size: 12 },
                gridcolor: '#e5e5e5'
              },
              margin: { t: 20, b: 80, l: 100, r: 40 },
              plot_bgcolor: '#fafafa',
              paper_bgcolor: 'white',
              hovermode: 'closest',
              responsive: true
            }}
            style={{ width: '100%', height: '500px' }}
          />
        </div>
      </main>
    </div>
  );
};

export default Trends;
