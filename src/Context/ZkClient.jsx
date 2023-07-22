import { ethers } from "ethers";
import { createContext, useState } from "react";
import { ZkBobClient, ProverMode, deriveSpendingKeyZkBob } from "zkbob-client-js";
import { hexToBuf } from "zkbob-client-js/lib/utils";
import { config } from "../config";
;
const ZkClientContext = createContext({
    zkClient: undefined,
    login: undefined,
    getMnemonic: () => undefined
});
export default ZkClientContext;
export const ZkClientProvider = (props) => {
    const [zkClient, setZkClient] = useState(undefined);
    const [mnemonic, setMnemonic] = useState(undefined);
    async function login() {
        const client = await ZkBobClient.create(config, 'BOB-sepolia');
        const mnemonic = ethers.utils.entropyToMnemonic(hexToBuf("9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"));
        console.log("mnemonic: ", mnemonic);
        setMnemonic(mnemonic);
        const accountConfig = {
            sk: deriveSpendingKeyZkBob(mnemonic),
            pool: 'BOB-sepolia',
            birthindex: -1,
            proverMode: ProverMode.Local,
        };
        await client.login(accountConfig);
        console.log(`Shielded account balance: ${await client.getTotalBalance()} Gwei`);
        console.log(client);
        setZkClient(client);
    }
    const getMnemonic = () => {
        return mnemonic;
    };
    return <ZkClientContext.Provider value={{ zkClient, login, getMnemonic }}>
    {props.children}
  </ZkClientContext.Provider>;
};
