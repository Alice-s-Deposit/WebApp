import React, { useState } from 'react';
import './App.css';
import { ZkBobClient, TxType } from 'zkbob-client-js';
import { ZkClientProvider } from './Context/ZkClient';
import { Auth } from './Components/Auth';
import { ShieldedAddressGenerator } from './Components/ShieldedAddressGenerator';

function App() {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleButtonClick = async () => {
    // Désactiver le bouton au clic
    setButtonDisabled(true);

    // Faire l'appel API ou le traitement ici
    // Par exemple, attendre 2 secondes pour simuler une requête asynchrone
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Réactiver le bouton après la réponse
    setButtonDisabled(false);
  };

  return (
    <div className="App">
      <div className="App-title">Cypher Deposit</div>
      <div className="enclosure">
        <ZkClientProvider>
          <Auth />
          <ShieldedAddressGenerator handleButtonClick={handleButtonClick} buttonDisabled={buttonDisabled} />
        </ZkClientProvider>
      </div>
    </div>
  );
}

export default App;