import React, {useState} from 'react';
import Navbar from '../components/NavBar';
import './Predict.css'

const Predict = () => {
  const [formData, setFormData] = useState({
    location: '',
    propertyType: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    parkingSpaces: '',
    yearBuilt: '',
    additionalFeatures: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your prediction logic here
  };

  return (
    <div className="predict-page">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <div className="predict-container">
        <div className="predict-header">
          <h1>Predict House Price</h1>
          <p>Get an instant estimate using our AI model.</p>
        </div>

        <form className="predict-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Row 1 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="petaling-jaya">Petaling Jaya</option>
                  <option value="subang-jaya">Subang Jaya</option>
                  <option value="shah-alam">Shah Alam</option>
                  <option value="klang">Klang</option>
                  <option value="kajang">Kajang</option>
                  <option value="seremban">Seremban</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bathrooms">Bathrooms:</label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="form-input"
                  min="1"
                  max="10"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="propertyType">Property Type:</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condominium</option>
                  <option value="terrace">Terrace House</option>
                  <option value="semi-d">Semi-Detached</option>
                  <option value="bungalow">Bungalow</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="parkingSpaces">Parking Spaces:</label>
                <input
                  type="number"
                  id="parkingSpaces"
                  name="parkingSpaces"
                  value={formData.parkingSpaces}
                  onChange={handleInputChange}
                  className="form-input"
                  min="0"
                  max="10"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="size">Size(sqm):</label>
                <input
                  type="number"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 1200"
                  min="100"
                />
              </div>

              <div className="form-group">
                <label htmlFor="yearBuilt">Year Built:</label>
                <input
                  type="number"
                  id="yearBuilt"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 2010"
                  min="1980"
                  max="2024"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bedrooms">Bedroom:</label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="form-input"
                  min="1"
                  max="10"
                />
              </div>

              <div className="form-group">
                <label htmlFor="additionalFeatures">Additional Features:</label>
                <input
                  type="text"
                  id="additionalFeatures"
                  name="additionalFeatures"
                  value={formData.additionalFeatures}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Pool, Garden, Security"
                />
              </div>
            </div>
          </div>

          <div className="form-submit">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Predict;