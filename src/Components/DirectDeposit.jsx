import React, { useState, useContext } from "react";
import ZkClientContext from "../Context/ZkClient";
import { DirectDepositType } from "zkbob-client-js";
import { TransactionConfig } from "web3-core";
import {Web3} from 'web3';


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

const DirectDeposit = ({ zkaddress, pbkey, pvkey }) => {
  const { zkClient } = useContext(ZkClientContext);
  const [transactionHash, setTransactionHash] = useState(undefined);

  const handleDirectDeposit = async () => {
    if (!zkClient) return;
    const tx = {
      to: zkaddress,
      amount: 0,
      data: "",
    };
    try {
      await zkClient.directDeposit(
        DirectDepositType.Token,
        zkaddress,
        50000000000n, // 50 BOB
        sendTxCallback(tx, zkaddress, setTransactionHash, pvkey),
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
