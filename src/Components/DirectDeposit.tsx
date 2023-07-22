import React, { useState, useContext } from "react";
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

async function sendTxCallback(tx: PreparedTransaction): Promise<void>{
  const password = localStorage.getItem(cookiePassword)? localStorage.getItem(cookiePassword) : 'pwd';
  const privKey = password? await getPrivKey(password): '';
  const pubKey = await getPubKey(privKey);

  const txObject: TransactionConfig = {
    from: pubKey,
    to: tx.to,
    value: tx.amount.toString(),
    data: tx.data,
  };
}



const DirectDeposit = () => {
  const { zkClient } = useContext(ZkClientContext);
  const [transactionHash, setTransactionHash] = useState(undefined);
  const [_zkaddress, setZkaddress] = useState('');
  const [_pbkey, setPbkey] = useState('');
  const [_pvkey, setPvkey] = useState('');
  const [amount, setAmount] = useState(BigInt(1000000));
  


  const handleDirectDeposit = async () => {

    const password = localStorage.getItem(cookiePassword)? localStorage.getItem(cookiePassword) : 'pwd';
    const privKey = password? await getPrivKey(password): '';
    const pubKey = await getPubKey(privKey);
    setPbkey(pubKey);
    setPvkey(privKey);
    // get zkAddress from localStorage
    const zkAddr = localStorage.getItem(ZK_ADDRESS_KEY)? localStorage.getItem(ZK_ADDRESS_KEY) : ('' && alert("Please generate a zkBob account first") );
    setZkaddress(zkAddr? zkAddr : '');
    console.log("Direct Deposit");
    console.log("zkaddress", zkAddr);
    console.log("pbkey", pubKey);
    console.log("pvkey", privKey);
    console.log(zkClient)

    try {
      if(pubKey === '' || privKey === '' || zkAddr === '') {
        return
      }
        const directDepoHash = await zkClient?.directDeposit(
        DirectDepositType.Native,
        _pbkey,
        BigInt(10000000),  // amount in native dimension GWEI
        async (tx: PreparedTransaction) => {
          const txObject: TransactionConfig = {
            from: _pbkey,
            to: tx.to,
            value: tx.amount.toString(),
            data: tx.data,
          };
          // setup web3
          console.log("rpc", rpc);
          const web3 = new Web3(rpc);
          const gas = await web3.eth.estimateGas(txObject);
          const gasPrice = Number(await web3.eth.getGasPrice());
          txObject.gas = gas;
          txObject.gasPrice = `0x${BigInt(gasPrice).toString(16)}`;
          txObject.nonce = await web3.eth.getTransactionCount(_pbkey);
      
          const signedTx = await web3.eth.signTransaction(txObject);
          const receipt = await web3.eth.sendSignedTransaction(signedTx.raw);
      
          return receipt.transactionHash;
        }
      );

      console.log("Direct Deposithash: ", directDepoHash);

    }
    catch (error) {
      console.error('Error:', error);
    }
    



  };

  return (

    <div>
      <button onClick={handleDirectDeposit}>Direct Deposit</button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default DirectDeposit;
