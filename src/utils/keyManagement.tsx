import { sha3_512 } from "js-sha3";
import React, { useState,useContext } from 'react';
import ZkClientContext from '../Context/ZkClient';

export const localStorageKey = 'privKey';

// return random hex encoded string
// NOT SECURE. ONLY USED FOR TIME SAVING PURPOSES
export function generatePrivKey(): string {
    return ("0x1" +
        Math.floor(Math.random())
        .toString(16)
        + Math.random().toString(16).substring(2) 
        + Math.random().toString(16).substring(2)
        + Math.random().toString(16).substring(2)
        + Math.random().toString(16).substring(2)
    );
}

export const savePrivKey = (privKey: string, password: string) => {
    // hash password using sha512
    const hashedPassword = "0x" + sha3_512(sha3_512(password));
    // encrypt private key using hashed password
    // NOT SECURE. ONLY USED FOR TIME SAVING PURPOSES
    const encryptedPrivKey = (BigInt(hashedPassword) * BigInt(privKey)).toString(16);
    // save private key in local Storage
    localStorage.setItem(localStorageKey, encryptedPrivKey)
}

// return 0 if bad password stored
export const getPrivKey = (password: string) => {
    //get the key from local storage
    const encrypted = localStorage.getItem(localStorageKey)? BigInt("0x" + localStorage.getItem(localStorageKey)) : BigInt(0);
    // hash password using sha512
    const hashedPassword = "0x" + sha3_512(sha3_512(password));
    // decrypt private key using hashed password
    return "0x" + (encrypted / BigInt(hashedPassword)).toString(16);
}


export function Generate(pwd: string){
    const password = pwd;
    // generate key 
    const priv = generatePrivKey();
    console.log("priv: ", priv);
    // save key
    savePrivKey(priv, password);
    // get key
    const priv2 = getPrivKey(password);
    return priv2;
}


export function PasswordInput() {
    const { zkClient, login } = useContext(ZkClientContext);
    const [password, setPassword] = useState('');
    const [generatedKey, setGeneratedKey] = useState('');
  
    const handleGenerateKey = () => {
      // Appeler la fonction Generate avec le mot de passe entré
      const privKey = Generate(password);
      setGeneratedKey(privKey);
    };
  
    return (
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button onClick={handleGenerateKey}>Generate Key</button>
        {generatedKey && <p>Generated Key: {generatedKey}</p>}
      </div>
    );
  }