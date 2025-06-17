import React from 'react';
import NavBar from '../components/NavBar';
import './Trends.css';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Trends = () => {
  // Sample data for the median house prices chart
  const medianPriceData = [
    { year: 2010, price: 400000 },
    { year: 2012, price: 420000 },
    { year: 2014, price: 380000 },
    { year: 2016, price: 450000 },
    { year: 2018, price: 430000 },
    { year: 2020, price: 480000 },
    { year: 2022, price: 520000 },
    { year: 2024, price: 580000 }
  ];

  // Sample data for the bar chart
  const barChartData = [
    { name: 'A', value: 60 },
    { name: 'B', value: 80 },
    { name: 'C', value: 90 },
    { name: 'D', value: 110 },
    { name: 'E', value: 130 }
  ];

  const propertyData = [
    {
      type: 'Terrace House',
      avgPrice: '780,000',
      yoyChange: '+4.2%',
      pricePerSqFt: '650',
      demandIndex: '8.5/10'
    },
    {
      type: 'Semi-Detached',
      avgPrice: '1,350,000',
      yoyChange: '+6.8%',
      pricePerSqFt: '700',
      demandIndex: '8.2/10'
    },
    {
      type: 'Bungalow',
      avgPrice: '2,450,000',
      yoyChange: '+5.1%',
      pricePerSqFt: '750',
      demandIndex: '7.6/10'
    },
    {
      type: 'Condominium',
      avgPrice: '620,000',
      yoyChange: '+2.3%',
      pricePerSqFt: '580',
      demandIndex: '7.4/10'
    },
    {
      type: 'Apartment',
      avgPrice: '380,000',
      yoyChange: '+1.2%',
      pricePerSqFt: '450',
      demandIndex: '6.8/10'
    }
  ];

  const areaData = [
    {
      area: 'Damansara',
      change: '+8.3% YoY',
      description: 'Premium locations and new developments are driving price growth'
    },
    {
      area: 'Cyberjaya',
      change: '+5.7% YoY',
      description: 'Tech industry expansion and infrastructure improvements boosting demand'
    },
    {
      area: 'Klang',
      change: '+0.9% YoY',
      description: 'Stable prices with minimal growth due to high inventory levels'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
       <NavBar/>
      </header>

     {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {/* Median House Prices Chart */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
              Median House Prices in Melbourne
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>(2010-2024)</p>
            <div style={{ height: '256px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={medianPriceData}>
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#000"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Property Types Table */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '24px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '500', color: '#555', borderBottom: '1px solid #e5e5e5' }}>Property Type</th>
                  <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '500', color: '#555', borderBottom: '1px solid #e5e5e5' }}>Average Price (RM)</th>
                  <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '500', color: '#555', borderBottom: '1px solid #e5e5e5' }}>YoY Change (%)</th>
                  <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '500', color: '#555', borderBottom: '1px solid #e5e5e5' }}>Price per Sq Ft (RM)</th>
                  <th style={{ textAlign: 'left', padding: '8px', fontSize: '14px', fontWeight: '500', color: '#555', borderBottom: '1px solid #e5e5e5' }}>Demand Index</th>
                </tr>
              </thead>
              <tbody>
                {propertyData.map((property, index) => (
                  <tr key={index}>
                    <td style={{ padding: '12px 8px', fontSize: '14px', color: '#333', borderBottom: '1px solid #f0f0f0' }}>{property.type}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', color: '#333', borderBottom: '1px solid #f0f0f0' }}>{property.avgPrice}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', color: '#16a34a', borderBottom: '1px solid #f0f0f0' }}>{property.yoyChange}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', color: '#333', borderBottom: '1px solid #f0f0f0' }}>{property.pricePerSqFt}</td>
                    <td style={{ padding: '12px 8px', fontSize: '14px', color: '#333', borderBottom: '1px solid #f0f0f0' }}>{property.demandIndex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px' }}>
          {/* Average Price Trends by Area */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333', marginBottom: '16px' }}>
              Average Price Trends by Area
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
              The graph below shows the average property prices in different areas of Selangor over the last 12 months. Petaling Jaya and Damansara continue to command premium prices, while areas like Cyberjaya show steady growth due to increasing tech investments.
            </p>

            <div>
              {areaData.map((area, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#60a5fa', borderRadius: '2px', marginTop: '4px', flexShrink: 0 }}></div>
                  <div>
                    <div>
                      <span style={{ fontWeight: '500', color: '#333', marginRight: '8px' }}>{area.area}:</span>
                      <span style={{ color: '#2563eb', fontWeight: '500' }}>{area.change}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '24px' }}>
            <div style={{ height: '256px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis hide />
                  <Bar
                    dataKey="value"
                    fill="#000"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Trends;