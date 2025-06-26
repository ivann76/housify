import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import './Predict.css';

const Predict = () => {
  // All possible options from your dataset
  const locationOptions = [
    "Kuala Lumpur", "Petaling Jaya", "Subang Jaya",
    "Puchong", "Cheras", "Damansara", "Mont Kiara",
    "Bangsar", "Setapak", "Ampang", "Kepong"
  ];

  const propertyTypeOptions = [
    "Condominium", "Apartment", "Serviced Residence",
    "Terrace House", "Semi-Detached", "Bungalow",
    "Townhouse", "Flat", "Penthouse", "Villa"
  ];

  const builtTypeOptions = [
    "New", "Renovated", "Partially Furnished",
    "Fully Furnished", "Unfurnished", "Landed"
  ];

  const [formData, setFormData] = useState({
    Location: '',
    Property_Type: '',
    Built_Type: '',
    Built_Size: '',
    Rooms: '3',
    Bathrooms: '2',
    Car_Parks: '1'
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataStats, setDataStats] = useState(null);

  // Fetch data statistics on component mount
  useEffect(() => {
    const fetchDataStats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/data_stats');
        const stats = await response.json();
        setDataStats(stats);
      } catch (err) {
        console.error('Failed to load data statistics', err);
      }
    };
    fetchDataStats();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict_price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Location: formData.Location,
          Property_Type: formData.Property_Type,
          Built_Type: formData.Built_Type,
          Built_Size: parseFloat(formData.Built_Size) || 0,
          Rooms: parseInt(formData.Rooms) || 0,
          Bathrooms: parseInt(formData.Bathrooms) || 1,
          Car_Parks: parseInt(formData.Car_Parks) || 1
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Prediction failed");
      }

      const result = await response.json();
      setPrediction(result.price);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="predict-page">
      <Navbar />
      <div className="predict-container">
        <div className="predict-header">
          <h1>Malaysia Property Price Predictor</h1>
          <p>Get an instant AI-powered estimate for your property</p>

          {dataStats && (
            <div className="data-stats">
              <p>Typical values in our database:</p>
              <ul>
                <li>Price range: RM {dataStats.price_range.min.toLocaleString()} - RM {dataStats.price_range.max.toLocaleString()}</li>
                {/*<li>Size range: {dataStats.built_size_range.min} - {dataStats.built_size_range.max} sqm</li>*/}
              </ul>
            </div>
          )}
        </div>

        <form className="predict-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Row 1: Location & Property Type */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Location">Location*</label>
                <select
                  id="Location"
                  name="Location"
                  value={formData.Location}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Location</option>
                  {locationOptions.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="Property_Type">Property Type*</label>
                <select
                  id="Property_Type"
                  name="Property_Type"
                  value={formData.Property_Type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type</option>
                  {propertyTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Built Type & Size */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Built_Type">Condition*</label>
                <select
                  id="Built_Type"
                  name="Built_Type"
                  value={formData.Built_Type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Condition</option>
                  {builtTypeOptions.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="Built_Size">Size (sqm)*</label>
                <input
                  type="number"
                  id="Built_Size"
                  name="Built_Size"
                  value={formData.Built_Size}
                  onChange={handleInputChange}
                  placeholder="e.g., 1200"
                  min="100"
                  max="49990"
                  step="10"
                  required
                />
                {dataStats && (
                  <span className="input-hint">Typical: {dataStats.built_size_range.min}-{dataStats.built_size_range.max} sqm</span>
                )}
              </div>
            </div>

            {/* Row 3: Rooms & Bathrooms */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Rooms">Rooms*</label>
                <input
                  type="number"
                  id="Rooms"
                  name="Rooms"
                  value={formData.Rooms}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="Bathrooms">Bathrooms*</label>
                <input
                  type="number"
                  id="Bathrooms"
                  name="Bathrooms"
                  value={formData.Bathrooms}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
            </div>

            {/* Row 4: Car Parks */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="Car_Parks">Parking Spaces*</label>
                <input
                  type="number"
                  id="Car_Parks"
                  name="Car_Parks"
                  value={formData.Car_Parks}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? 'Predicting...' : 'Get Price Estimate'}
          </button>
        </form>

        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}

        {prediction !== null && !error && (
          <div className="prediction-result">
            <h3>Estimated Property Value</h3>
            <div className="price-display">
              RM {prediction.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </div>
            <p className="disclaimer">
              This estimate is based on current market trends and should be used as a guide only.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;