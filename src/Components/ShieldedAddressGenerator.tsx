import React, { useContext, useState } from 'react';
import ZkClientContext from '../Context/ZkClient';

interface ShieldedAddressGenerator {
  handleButtonClick: () => void;
  buttonDisabled: boolean;
}

export const ShieldedAddressGenerator: React.FC<ShieldedAddressGenerator> = ({
  handleButtonClick,
  buttonDisabled,
}) => {
  const { zkClient } = useContext(ZkClientContext);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [mnemonic, setMnemonic] = useState<string | undefined>(undefined);

  const genAddress = async () => {
    if (!zkClient) return;

    try {
      handleButtonClick(); // Appeler la fonction parent pour désactiver le bouton

      const _address = await zkClient.generateUniversalAddress();
      console.log('address: ', _address);
      setAddress(_address);
    } catch (error) {
      console.error('Erreur lors de la génération de l\'adresse :', error);
    }
  };

  return (
    <div>
      {zkClient && (
        <div>
          <button onClick={genAddress} disabled={buttonDisabled} className={buttonDisabled ? 'disabled' : ''}>
            Generate Address
          </button>
          <p>{address}</p>
          <p>{mnemonic}</p>
          {address && <p>⚠️ SAVE IT</p>}
        </div>
      )}
    </div>
  );
};