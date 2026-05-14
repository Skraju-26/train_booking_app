import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Users, UserPlus, CreditCard, ArrowLeft } from 'lucide-react';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, searchParams } = location.state || {};

  const [passengerCount, setPassengerCount] = useState(1);
  const [passengers, setPassengers] = useState([{ name: '', age: '', aadhar: '' }]);

  // If no train data is found in state, redirect to dashboard
  if (!train) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>No Train Selected</h2>
        <button className="btn-primary" onClick={() => navigate('/dashboard')} style={{ marginTop: '16px' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handlePassengerCountChange = (e) => {
    const count = parseInt(e.target.value) || 1;
    // Limit to reasonable number, e.g., 6
    const validCount = Math.min(Math.max(count, 1), 6);
    setPassengerCount(validCount);
    
    // Adjust passenger array size
    const newPassengers = [...passengers];
    if (validCount > passengers.length) {
      for (let i = passengers.length; i < validCount; i++) {
        newPassengers.push({ name: '', age: '', aadhar: '' });
      }
    } else if (validCount < passengers.length) {
      newPassengers.splice(validCount);
    }
    setPassengers(newPassengers);
  };

  const handlePassengerDataChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields are filled
    const isValid = passengers.every(p => p.name && p.age && p.aadhar);
    if (!isValid) {
      alert('Please fill out all passenger details.');
      return;
    }
    
    // Calculate total price
    const totalPrice = train.price * passengerCount;

    // Proceed to payment, passing data
    navigate('/payment', { state: { train, passengers, totalPrice, searchParams } });
  };

  return (
    <div className="animate-fade-in">
      <button 
        className="btn-secondary" 
        onClick={() => navigate('/dashboard')}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'transparent', padding: 0, marginBottom: '24px' }}
      >
        <ArrowLeft size={20} /> Back to Search
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ color: 'var(--primary-dark)', marginBottom: '8px' }}>Passenger Details</h1>
          <p>Please enter details for all passengers travelling on {train.name}.</p>
        </div>
        
        <div className="glass-panel" style={{ padding: '16px 24px', borderRadius: 'var(--radius-lg)', textAlign: 'right' }}>
          <p style={{ fontSize: '0.9rem', marginBottom: '4px' }}>Total Amount</p>
          <h2 style={{ color: 'var(--primary-color)', margin: 0 }}>₹{train.price * passengerCount}</h2>
        </div>
      </div>

      <div className="search-card glass-panel" style={{ marginBottom: '24px' }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label htmlFor="passengerCount" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} /> Number of Passengers (Max 6)
          </label>
          <input 
            type="number" 
            id="passengerCount" 
            min="1" 
            max="6" 
            value={passengerCount}
            onChange={handlePassengerCountChange}
            style={{ maxWidth: '200px' }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {passengers.map((passenger, index) => (
          <div key={index} className="passenger-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--primary-dark)' }}>
              <UserPlus size={20} /> Passenger {index + 1}
            </h3>
            
            <div className="passenger-grid">
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter full name" 
                  value={passenger.name}
                  onChange={(e) => handlePassengerDataChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <label>Age</label>
                <input 
                  type="number" 
                  placeholder="Age" 
                  value={passenger.age}
                  onChange={(e) => handlePassengerDataChange(index, 'age', e.target.value)}
                  min="1"
                  max="120"
                  required
                />
              </div>
              
              <div className="input-group">
                <label>Aadhar Number</label>
                <input 
                  type="text" 
                  placeholder="12-digit Aadhar No." 
                  value={passenger.aadhar}
                  onChange={(e) => handlePassengerDataChange(index, 'aadhar', e.target.value)}
                  pattern="\d{12}"
                  title="Aadhar number must be 12 digits"
                  required
                />
              </div>
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '16px 32px', fontSize: '1.1rem' }}>
            <CreditCard size={20} />
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Booking;
