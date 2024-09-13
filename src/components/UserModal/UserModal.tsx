import React, { useEffect, useState } from 'react';
import './UserModal.scss';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface ModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<ModalProps> = ({ user, isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => {
        document.body.classList.add('modal-open');
      }, 0);
    } else {
      document.body.classList.remove('modal-open');
      const timer = setTimeout(() => setIsVisible(false), 400); 
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    isVisible && (
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          {user && (
            <>
              <h2>{user.name}</h2>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default UserModal;
