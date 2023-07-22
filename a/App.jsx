import React, { useState } from 'react';
import './App.css';
import { Widget } from './Components/Widget';
import { Auth } from './Components/Auth';
import { ShieldedAddressGenerator } from './Components/ShieldedAddressGenerator';
//import { PasswordInput } from './utils/keyManagement';
import { InfoList } from './Components/InfoList';
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
    return (<div className="App">
      <div className="App-title">Cypher Deposit</div>
      <InfoList />
      
      <div className="enclosure">
      <h2>Generate a new burner ETH address</h2>
        
      </div>

      <div className="enclosure">
        <h2>zkBob <br></br>Generate a new shielded address</h2>
        <Widget src={`jamonix.near/widget/ZkClient`}  />
          <Auth />
          <ShieldedAddressGenerator handleButtonClick={handleButtonClick} buttonDisabled={buttonDisabled}/>
          <Widget src={`jamonix.near/widget/ZkClient`}  />
      </div>

      <footer></footer>
    </div>);
}
export default App;
