import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Train, ArrowRight, Calendar } from 'lucide-react';

// Mock data service that could later be replaced with an API call
const fetchTrains = (from, to, date) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'T1201', name: 'Shatabdi Express', departure: '06:00 AM', arrival: '11:30 AM', duration: '5h 30m', price: 850 },
        { id: 'T1202', name: 'Rajdhani Express', departure: '08:15 AM', arrival: '12:45 PM', duration: '4h 30m', price: 1200 },
        { id: 'T1203', name: 'Vande Bharat', departure: '02:30 PM', arrival: '06:15 PM', duration: '3h 45m', price: 1500 },
      ]);
    }, 600); // Simulate network delay
  });
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({ from: '', to: '', date: '' });
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchParams.from && searchParams.to && searchParams.date) {
      setLoading(true);
      setSearched(true);
      // Fetch mock data
      const results = await fetchTrains(searchParams.from, searchParams.to, searchParams.date);
      setTrains(results);
      setLoading(false);
    }
  };

  const handleBook = (train) => {
    // Navigate to booking page and pass the selected train details in state
    navigate('/booking', { state: { train, searchParams } });
  };

  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '8px', color: 'var(--primary-dark)' }}>Find Your Train</h1>
      <p style={{ marginBottom: '32px' }}>Search for availability and book your tickets instantly.</p>

      {/* Search Section */}
      <div className="search-card glass-panel">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor="from">From City</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                id="from" 
                name="from" 
                placeholder="e.g., Chennai" 
                value={searchParams.from}
                onChange={handleSearchChange}
                required
              />
            </div>
          </div>
          
          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor="to">To City</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                id="to" 
                name="to" 
                placeholder="e.g., Bangalore" 
                value={searchParams.to}
                onChange={handleSearchChange}
                required
              />
            </div>
          </div>

          <div className="input-group" style={{ marginBottom: 0 }}>
            <label htmlFor="date">Travel Date</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="date" 
                id="date" 
                name="date" 
                value={searchParams.date}
                onChange={handleSearchChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '44px' }}>
            <Search size={18} />
            Search Trains
          </button>
        </form>
      </div>

      {/* Results Section */}
      {searched && (
        <div className="results-section animate-fade-in">
          <h2 style={{ marginBottom: '24px' }}>Available Trains</h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              <div style={{ animation: 'spin 1s linear infinite', display: 'inline-block', marginBottom: '16px' }}>
                <Train size={32} color="var(--primary-color)" />
              </div>
              <p>Searching for the best trains...</p>
            </div>
          ) : trains.length > 0 ? (
            <div className="train-list">
              {trains.map((train) => (
                <div key={train.id} className="train-result-card animate-fade-in">
                  <div className="train-info">
                    <div style={{ background: 'var(--primary-light)', padding: '12px', borderRadius: '50%', color: 'var(--primary-dark)' }}>
                      <Train size={24} />
                    </div>
                    <div>
                      <h3 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.2rem' }}>{train.name}</h3>
                      <p style={{ margin: 0, fontSize: '0.9rem' }}>Train No: {train.id}</p>
                    </div>
                  </div>
                  
                  <div className="train-route">
                    <div className="train-time">
                      <h3>{train.departure}</h3>
                      <p>{searchParams.from}</p>
                    </div>
                    
                    <div className="train-route-line">
                      <div className="dot"></div>
                      <div className="line"></div>
                      <span style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--primary-color)' }}>{train.duration}</span>
                      <div className="line"></div>
                      <div className="dot"></div>
                    </div>
                    
                    <div className="train-time">
                      <h3>{train.arrival}</h3>
                      <p>{searchParams.to}</p>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-dark)', marginBottom: '8px' }}>₹{train.price}</p>
                    <button className="btn-primary" onClick={() => handleBook(train)}>
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', background: 'var(--surface-color)', borderRadius: 'var(--radius-lg)' }}>
              <p>No trains found for this route on the selected date.</p>
            </div>
          )}
        </div>
      )}
      
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Dashboard;
