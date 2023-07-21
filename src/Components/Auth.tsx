import React, { useContext, useState } from 'react';
import ZkClientContext from '../Context/ZkClient';

export const Auth = () => {
  const { zkClient, login } = useContext(ZkClientContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // État local pour désactiver le bouton

  const handleLoginClick = async () => {
    if (isButtonDisabled || !login || zkClient) return;

    try {
      setIsButtonDisabled(true); // Désactiver le bouton après le clic
      await login(); // Effectuer la tentative de connexion

      // Réactiver le bouton après 15 secondes (15000 millisecondes)
      setTimeout(() => setIsButtonDisabled(false), 15000);
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setIsButtonDisabled(false); // Réactiver le bouton en cas d'erreur
    }
  };

  return (
    <div>
      {!zkClient && (
        <button onClick={handleLoginClick} disabled={isButtonDisabled}>
          {isButtonDisabled ? 'Loading...' : 'Login'}
        </button>
      )}
    </div>
  );
};
