import React, { useState, useContext } from "react";
import ZkClientContext from "../Context/ZkClient";
import { DirectDepositType } from "zkbob-client-js";
import { TransactionConfig } from "web3-core";
import {Web3} from 'web3';
import { getPrivKey, getPubKey } from "../utils/keyManagement";
import Cookies from 'js-cookie';

export const localStorageKey = 'privKey';
export const localStoragepubKey = 'pubKey';
export const cookiePassword = 'password';
export const ZK_ADDRESS_KEY = 'zkAddress';


async function sendTxCallback(tx, myAddress, setTransactionHash, pvkey) {
  const txObject = {
    from: myAddress,
    to: tx.to,
    value: tx.amount.toString(),
    data: tx.data,
  };

  const gas = await Web3.eth.estimateGas(txObject);
  const gasPrice = Number(await Web3.eth.getGasPrice());
  txObject.gas = gas;
  txObject.gasPrice = `0x${gasPrice.toString(16)}`;
  txObject.nonce = await Web3.eth.getTransactionCount(myAddress);

  const signedTx = await Web3.eth.accounts.signTransaction(txObject, pvkey);
  const receipt = await Web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  setTransactionHash(receipt.transactionHash);

  return "0x1234567890";
}

const DirectDeposit = () => {
  const { zkClient } = useContext(ZkClientContext);
  const [transactionHash, setTransactionHash] = useState(undefined);
  const [_zkaddress, setZkaddress] = useState();
    const [_pbkey, setPbkey] = useState();
    const [_pvkey, setPvkey] = useState();
  

  const handleDirectDeposit = async () => {

    const password = localStorage.getItem(cookiePassword)? localStorage.getItem(cookiePassword) : '';
    const privKey = await getPrivKey(password);
    const pubKey = await getPubKey(privKey);
    setPbkey(pubKey);
    setPvkey(privKey);
    // get zkAddress from localStorage
    const zkAddr = localStorage.getItem(ZK_ADDRESS_KEY)? localStorage.getItem(ZK_ADDRESS_KEY) : ('' && alert("Please generate a zkBob account first") );
    setZkaddress(zkAddr);
    console.log("Direct Deposit");
    console.log("zkaddress", _zkaddress);
    // console.log("pass: ", password);
    // console.log("privateeee: ", _pvkey);
    // console.log("pub: ", _pbkey);
    if (!zkClient) return;
    const tx = {
      to: _zkaddress,
      amount: 0,
      data: "",
    };
    try {
      await zkClient.directDeposit(
        DirectDepositType.Token,
        _zkaddress,
        50000000000n, // 50 BOB
        sendTxCallback(tx, _zkaddress, setTransactionHash, _pvkey),
      );
    } catch (error) {
      console.error("Erreur lors de la transaction :", error);
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
