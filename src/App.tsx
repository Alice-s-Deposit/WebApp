import React, { useState } from 'react';
import './App.css';
import { ZkBobClient, TxType } from 'zkbob-client-js';
import { ZkClientProvider } from './Context/ZkClient';
import { Auth } from './Components/Auth';
import { ShieldedAddressGenerator } from './Components/ShieldedAddressGenerator';
import { PasswordInput } from './utils/keyManagement'
import { InfoList } from './Components/InfoList';
import DirectDeposit from './Components/DirectDeposit';

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
      <InfoList />
      
      <div className="enclosure">
      <h2>Generate a new burner ETH address</h2>
        <PasswordInput />
      </div>

      <div className="enclosure">
        <h2>zkBob <br></br>Generate a new shielded address</h2>
        <ZkClientProvider>
          <Auth />
          <ShieldedAddressGenerator handleButtonClick={handleButtonClick} buttonDisabled={buttonDisabled} />
        </ZkClientProvider>
      </div>

      <div className="enclosure">
        <h2>Direct deposit</h2>
        <DirectDeposit />
      </div>

      <footer></footer>
    </div>
     );
}

export default App;