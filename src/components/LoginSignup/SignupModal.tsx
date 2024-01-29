import React from 'react';
import { modalStyle } from './ModelStyles';

interface SignupModalProps {
  onClose: () => void; // Assuming onClose is a function that takes no arguments and returns void
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose }) => {
  // Add your signup form logic here

  return (
    <div style={modalStyle} className="modal">
      {/* Signup form content */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default SignupModal;
