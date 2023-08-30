import React from 'react';

type AuthModalProps = {
    toggleModal: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg">
        <button onClick={closeModal} className="float-right">
          X
        </button>
        <h2 className="text-xl mb-4">Sign In or Sign Up</h2>
        {/* Add your sign-in and sign-up form or buttons here */}
      </div>
    </div>
  );
};

export default AuthModal;
