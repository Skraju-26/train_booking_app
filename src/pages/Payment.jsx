import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, passengers, totalPrice, searchParams } = location.state || {};

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // If no data, redirect
  if (!train || !totalPrice) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Invalid Payment Session</h2>
        <button className="btn-primary" onClick={() => navigate('/dashboard')} style={{ marginTop: '16px' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handlePay = () => {
    setProcessing(true);
    // Mock payment processing delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="payment-container animate-fade-in">
        <div className="payment-card glass-panel">
          <div className="success-icon animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Check size={40} />
          </div>
          <h2 style={{ color: '#10b981', marginBottom: '16px' }}>Payment Successful!</h2>
          <p style={{ marginBottom: '8px' }}>Your booking for <strong>{train.name}</strong> is confirmed.</p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
            Tickets have been sent to your registered email and mobile number.
          </p>
          
          <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '32px', textAlign: 'left' }}>
            <p><strong>PNR:</strong> {Math.floor(1000000000 + Math.random() * 9000000000)}</p>
            <p><strong>Route:</strong> {searchParams?.from} to {searchParams?.to}</p>
            <p><strong>Date:</strong> {searchParams?.date}</p>
            <p><strong>Passengers:</strong> {passengers?.length}</p>
            <p><strong>Total Paid:</strong> ₹{totalPrice}</p>
          </div>

          <button className="btn-primary" onClick={() => navigate('/dashboard')} style={{ width: '100%' }}>
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container animate-fade-in">
      <div className="payment-card glass-panel" style={{ textAlign: 'left' }}>
        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CreditCard size={28} /> Complete Payment
        </h2>
        <p style={{ marginBottom: '32px' }}>Please review your booking details before proceeding to pay.</p>

        <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>Booking Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Train</span>
            <strong>{train.name} ({train.id})</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span>Passengers</span>
            <strong>{passengers.length}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--border-color)' }}>
            <strong>Total Amount</strong>
            <strong style={{ color: 'var(--primary-color)' }}>₹{totalPrice}</strong>
          </div>
        </div>

        <div style={{ background: 'var(--primary-light)', padding: '16px', borderRadius: 'var(--radius-md)', display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '32px' }}>
          <ShieldCheck size={24} color="var(--primary-dark)" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--primary-dark)' }}>
            This is a secure 256-bit encrypted payment gateway. Your details are safe.
          </p>
        </div>

        <button 
          className="btn-primary" 
          onClick={handlePay} 
          disabled={processing}
          style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', opacity: processing ? 0.7 : 1 }}
        >
          {processing ? (
            <>Processing Payment...</>
          ) : (
            <>Pay ₹{totalPrice} <ArrowRight size={18} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;
