import React from 'react';

interface LoginModalProps {
  onClose: () => void; // Assuming onClose is a function that takes no arguments and returns void
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  // Add your login form logic here
  const handleLogin = () => {
    // Add your login logic here
    // This function will be called when the user clicks the login button
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '20px',
    border: '1px solid #ccc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={modalStyle} id='login' className='login-modal-container'>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username"/>
        <br />
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" name="password"/>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default LoginModal;
