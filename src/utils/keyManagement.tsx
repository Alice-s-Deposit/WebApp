import { sha3_512, keccak256 } from "js-sha3";
import { useState,useContext } from 'react';
import { ethers } from "ethers";

export const localStorageKey = 'privKey';
// Generator point on the SECP256K1 curve
const Gx =
  BigInt('55066263022277343669578718895168534326250603453777594175500187360389116729240');
const Gy =
  BigInt('32670510020758816978083085130507043184471273380659243275938904335757337482424');
const G: [bigint, bigint] = [Gx, Gy];

// returns a random private key
// NOT SECURE. ONLY USED FOR TIME SAVING PURPOSES
export function generatePrivKey(): string {
  const length: number = 64;
  const key: string = [...Array(length)]
    .map(() => {
      return Math.floor(Math.random() * 16).toString(16);
    })
    .join("");
  return "0x" + key;
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
    if (password == "") return "0x" + (encrypted / BigInt(hashedPassword)).toString(16);
    return "0x" + (encrypted / BigInt(hashedPassword)).toString(16);
}

// get public key from private key
export const getPubKey = (privKey: string) => {
  const wallet = new ethers.Wallet(privKey);
  return wallet.address;
}


export function Generate(pwd: string): { privateKey: string; publicKey: string } {
    const password = pwd;
    // generate key 
    const priv = generatePrivKey();
    // save key
    savePrivKey(priv, password);
    // get key
    const priv2 = getPrivKey(password);
    // get public key
    const pubKey = getPubKey(priv);

    return { privateKey: priv2, publicKey: pubKey };
}

export function PasswordInput() {
    const [password, setPassword] = useState('');
    const [generatedKeys, setGeneratedKeys] = useState({ privateKey: '', publicKey: '' });

    function savePassword(password: string) {
     localStorage.setItem("password", password); // change to cookie when we switch this file to jsx
     setPassword(password);
    }


    const handleGenerateKey = () => {
      if(password == '') return alert("Please enter a password first")
      // Appeler la fonction Generate avec le mot de passe entré
      const keys = Generate(password);
      setGeneratedKeys(keys);
    };
  
    return (
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => savePassword(e.target.value)}
          placeholder="Enter password"
        />
        <button onClick={handleGenerateKey}>Generate Key</button>
        {generatedKeys.privateKey != '' && <p><b>Generated Private Key:</b> {generatedKeys.privateKey}</p>}
        {generatedKeys.publicKey != '' && <p><b>Generated Public Key:</b> {generatedKeys.publicKey}</p>}
        {generatedKeys.privateKey && generatedKeys.publicKey && <p>⚠️ SAVE IT</p>}
      </div>
    );
}
