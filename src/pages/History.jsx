import React, { useState } from 'react';
import NavBar from "../components/NavBar";
import './History.css';

const History = () => {
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedPropertyType, setSelectedPropertyType] = useState('All Types');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Last 5 Years');

  const regions = ['All Regions', 'Kuala Lumpur', 'Selangor', 'Penang', 'Johor', 'Perak'];
  const propertyTypes = ['All Types', 'Condominium', 'Terrace House', 'Apartment', 'Bungalow', 'Semi-D'];
  const timePeriods = ['Last 5 Years', 'Last 10 Years', 'Last 15 Years', 'All Time'];

  const handleApplyFilters = () => {
    console.log('Filters applied:', {
      region: selectedRegion,
      propertyType: selectedPropertyType,
      timePeriod: selectedTimePeriod
    });
    // Add your filter logic here
  };

  return (
      <div className="app">
      <NavBar/>

      {/* Main Content */}
      <div style={{ paddingTop: '100px', padding: '100px 5% 50px 5%' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Title */}
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '1rem',
            paddingBottom: '0.5rem',
            borderBottom: '3px solid #3498db'
          }}>
            Historical Housing Price Data
          </h1>

          {/* Filter Section */}
          <div style={{ marginTop: '2rem' }}>
            {/* Region Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#555',
                marginBottom: '0.5rem'
              }}>
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  backgroundColor: '#f8f9fa',
                  color: '#333',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Property Type Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#555',
                marginBottom: '0.5rem'
              }}>
                Property Type
              </label>
              <select
                value={selectedPropertyType}
                onChange={(e) => setSelectedPropertyType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  backgroundColor: '#f8f9fa',
                  color: '#333',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Time Period Filter */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#555',
                marginBottom: '0.5rem'
              }}>
                Time Period
              </label>
              <select
                value={selectedTimePeriod}
                onChange={(e) => setSelectedTimePeriod(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  backgroundColor: '#f8f9fa',
                  color: '#333',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {timePeriods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>

            {/* Apply Filters Button */}
            <button
              onClick={handleApplyFilters}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'white',
                backgroundColor: '#5dade2',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#3498db'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#5dade2'}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;