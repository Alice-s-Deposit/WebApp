import React, { useState, useContext, useEffect } from "react";
import ZkClientContext from "../Context/ZkClient";
import { DirectDepositType } from "zkbob-client-js";
import { TransactionConfig } from "web3-core";
import { getPrivKey, getPubKey } from "../utils/keyManagement";
import Web3 from "web3";
import { config } from "../config";

export const localStorageKey = 'privKey';
export const localStoragepubKey = 'pubKey';
export const cookiePassword = 'password';
export const ZK_ADDRESS_KEY = 'zkAddress';


const rpc = config.chains['5'].rpcUrls[0];
interface PreparedTransaction {
  to: string;    // DD queue contract address
  amount: bigint;    // amount in native dimension
  data: string;    // transaction raw data
}


const DirectDeposit = () => {
  const { zkClient } = useContext(ZkClientContext);
  const [transactionHash, setTransactionHash] = useState("");
  const [_zkaddress, setZkaddress] = useState('');
  const [_pbkey, setPbkey] = useState('');
  const [_pvkey, setPvkey] = useState('');
  const [isTransactionPending, setIsTransactionPending] = useState(false);

  useEffect(() => {
    const zkAddr = localStorage.getItem(ZK_ADDRESS_KEY)? localStorage.getItem(ZK_ADDRESS_KEY) : '';
    setZkaddress(zkAddr? zkAddr : '');
    const password = localStorage.getItem(cookiePassword)? localStorage.getItem(cookiePassword) : 'pwd';
    const privKey = password? localStorage.getItem(localStorageKey) : '';
    const pubKey = password? localStorage.getItem(localStoragepubKey) : '';
    setPbkey(pubKey? pubKey : '');
    setPvkey(privKey? privKey : '');
    
  }, []);
  
  const handleDirectDeposit = async () => {

    await setIsTransactionPending(true);
    const password = localStorage.getItem(cookiePassword)? localStorage.getItem(cookiePassword) : 'pwd';
    const privKey = password? await getPrivKey(password): '';
    const pubKey = await getPubKey(privKey);
    await setPbkey(pubKey);
    await setPvkey(privKey);
    // get zkAddress from localStorage
    const zkAddr = localStorage.getItem(ZK_ADDRESS_KEY)? localStorage.getItem(ZK_ADDRESS_KEY) : ('' && alert("Please generate a zkBob account first") );
    setZkaddress(zkAddr? zkAddr : '');
    console.log("Direct Deposit");
    console.log("zkaddress", zkAddr);
    console.log("pbkey", pubKey);
    console.log("pvkey", privKey);
    console.log(zkClient)
    if(pubKey == '' || privKey === '' || zkAddr === '') {
      await setIsTransactionPending(false);
      console.log("vide");
      return;
    }
    try {
        
        const directDepoHash = await zkClient?.directDeposit(
        DirectDepositType.Native,
        _pbkey,
        BigInt(1000000),  // amount in native dimension GWEI
        async (tx: PreparedTransaction) => {
          const txObject: TransactionConfig = {
            from: _pbkey,
            to: tx.to,
            value: tx.amount.toString(),
            data: tx.data,
          };
          // setup web3
          console.log("rpc", rpc);
          const web3 = new Web3("https://rpc.ankr.com/eth_goerli");
          const gas = await web3.eth.estimateGas(txObject);
          const gasPrice = Number(await web3.eth.getGasPrice());
          txObject.gas = gas;
          txObject.gasPrice = `0x${BigInt(gasPrice).toString(16)}`;
          txObject.nonce = await web3.eth.getTransactionCount(_pbkey);
          console.log("txObject", txObject);
          const signedTx = await web3.eth.accounts.signTransaction(txObject, _pvkey);
          console.log("signedTx", signedTx);
          const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);
          console.log("receipt", receipt);
          setTransactionHash(receipt.transactionHash);
          await setIsTransactionPending(false);
          return receipt.transactionHash;
        }
      );

    }
    catch (error) {
      console.error('Error:', error);
      await setIsTransactionPending(false);
      
    }
    
  };

  return (

    <div>
      <button onClick={handleDirectDeposit} disabled={isTransactionPending} >{isTransactionPending ? "Pending" : "Direct Deposit"}</button>
      
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default DirectDeposit;
