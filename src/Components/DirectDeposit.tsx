import React, { useState, useContext } from "react";
import ZkClientContext from "../Context/ZkClient";
import { DirectDepositType } from "zkbob-client-js";
import { TransactionConfig } from "web3-core";
import { getPrivKey, getPubKey } from "../utils/keyManagement";

export const localStorageKey = 'privKey';
export const localStoragepubKey = 'pubKey';
export const cookiePassword = 'password';
export const ZK_ADDRESS_KEY = 'zkAddress';

interface PreparedTransaction {
  to: string;    // DD queue contract address
  amount: bigint;    // amount in native dimension
  data: string;    // transaction raw data
}


const DirectDeposit = () => {
  const { zkClient } = useContext(ZkClientContext);
  const [transactionHash, setTransactionHash] = useState(undefined);
  const [_zkaddress, setZkaddress] = useState('');
  const [_pbkey, setPbkey] = useState('');
  const [_pvkey, setPvkey] = useState('');
  

  const handleDirectDeposit = async () => {

    const password = localStorage.getItem(cookiePassword)? localStorage.getItem(cookiePassword) : 'pwd';
    const privKey = await getPrivKey(password);
    const pubKey = await getPubKey(privKey);
    setPbkey(pubKey);
    setPvkey(privKey);
    // get zkAddress from localStorage
    const zkAddr = localStorage.getItem(ZK_ADDRESS_KEY)? localStorage.getItem(ZK_ADDRESS_KEY) : ('' && alert("Please generate a zkBob account first") );
    setZkaddress(zkAddr);
    console.log("Direct Deposit");
    console.log("zkaddress", _zkaddress);
    console.log("pbkey", _pbkey);
    console.log("pvkey", _pvkey);
    if (!zkClient) return;

    //
    await zkClient.directDeposit(
      DirectDepositType.Token,
      pubKey,
      500000000n,  // 50 BOB
      async (tx: PreparedTransaction) => {
        const txObject: TransactionConfig = {
          from: pubKey,
          to: tx.to,
          value: tx.amount.toString(),
          data: tx.data,
        };
  
        const gas = await this.web3.eth.estimateGas(txObject);
        const gasPrice = Number(await this.web3.eth.getGasPrice());
        txObject.gas = gas;
        txObject.gasPrice = `0x${BigInt(gasPrice).toString(16)}`;
        txObject.nonce = await this.web3.eth.getTransactionCount(address);
    
        const signedTx = await this.web3.eth.signTransaction(txObject);
        const receipt = await this.web3.eth.sendSignedTransaction(signedTx.raw);
    
        return receipt.transactionHash;
      }
  );





    //
    



  };

  return (

    <div>
      <button onClick={handleDirectDeposit}>Direct Deposit</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default DirectDeposit;
