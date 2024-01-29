import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import LoginModal from '../LoginModal';
import SignupModal from '../SignupModal';
import "./style.css";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLoginModal = () => {
    // Open a new window
    const newWindow = window.open('', '_blank', 'width=600,height=400');
    if (newWindow) {
      // Render the LoginModal component inside the new window
      const modalContainer = newWindow.document.createElement('div');
      newWindow.document.body.appendChild(modalContainer);
  
      const root = createRoot(modalContainer);
      root.render(<LoginModal onClose={() => newWindow.close()} />);
    } else {
      // Handle the case where window.open returns null (popup blocked)
      alert('Popup blocked. Please allow popups for this site.');
    }
  }
  const closeLoginModal = () => setShowLoginModal(false);

  const openSignupModal = () => setShowSignupModal(true);
  const closeSignupModal = () => setShowSignupModal(false);
  return (
    <header>
      <div>
        <h2>{title}</h2>
        <div>
          <button onClick={openLoginModal}>Login</button>
          <button onClick={openSignupModal}>Signup</button>
          {/* Render modals based on state */}
          {showLoginModal && <LoginModal onClose={closeLoginModal} />}
          {showSignupModal && <SignupModal onClose={closeSignupModal} />}
        </div>
      </div>

    </header>
  );
};

export default Header;
