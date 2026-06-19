import { useState } from 'react';

export default function Login({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const endpoint = isLoginMode ? '/login' : '/register';
    const url = `http://localhost:3000${endpoint}`;

    try {
      const bodyData = isLoginMode ? { email, password } : { name, email, password };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || 'Terjadi kesalahan');
        return;
      }

      // Success (for both login and register)
      onLogin(data.user);
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server. Pastikan server backend menyala.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="logo"><span className="highlight">To</span>-Do</h1>
          <p>{isLoginMode ? 'Welcome back! Please login to your account.' : 'Create a new account to get started.'}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {errorMsg && <div style={{ color: 'red', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{errorMsg}</div>}
          
          {!isLoginMode && (
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLoginMode}
              />
            </div>
          )}

          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="login-actions" style={{ justifyContent: isLoginMode ? 'space-between' : 'flex-end' }}>
            {isLoginMode && (
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
            )}
            {isLoginMode && <a href="#" className="forgot-password">Forgot Password?</a>}
          </div>

          <button type="submit" className="btn-login">
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <span 
            style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }} 
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setErrorMsg('');
            }}
          >
            {isLoginMode ? 'Sign Up' : 'Login'}
          </span>
        </div>
      </div>
    </div>
  );
}
