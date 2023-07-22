// import React, { useContext, useState } from "react";
// import ZkClientContext from "../Context/ZkClient";
// import { PreparedTransaction, DirectDepositType } from "zkbob-client-js";

// interface DirectDepositProps {
//   myAddress: string;
// }

// export const DirectDeposit: React.FC<DirectDepositProps> = ({ myAddress }) => {
//   const { zkClient } = useContext(ZkClientContext);
//   const [transactionHash, setTransactionHash] = useState<string | undefined>(undefined);

//   const handleDirectDeposit = async () => {
//     if (!zkClient) return;

//     try {
//       await zkClient.directDeposit(DirectDepositType.Token, myAddress, 50000000000n, async (tx: PreparedTransaction) => {
//         const txObject: TransactionConfig = {
//           from: myAddress,
//           to: tx.to,
//           value: tx.amount.toString(),
//           data: tx.data,
//         };

//         const gas = await this.web3.eth.estimateGas(txObject);
//         const gasPrice = Number(await this.web3.eth.getGasPrice());
//         txObject.gas = gas;
//         txObject.gasPrice = `0x${BigInt(gasPrice).toString(16)}`;
//         txObject.nonce = await this.web3.eth.getTransactionCount(myAddress);

//         const signedTx = await this.web3.eth.signTransaction(txObject);
//         const receipt = await this.web3.eth.sendSignedTransaction(signedTx.raw);

//         setTransactionHash(receipt.transactionHash);
//       });
//     } catch (error) {
//       console.error("Erreur lors de la transaction :", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleDirectDeposit}>Direct Deposit</button>
//       {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
//     </div>
//   );
// };
