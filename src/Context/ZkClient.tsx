import { ethers } from "ethers";
import { createContext, useState, ReactNode, FC } from "react";
import { ZkBobClient, AccountConfig, ClientConfig, ProverMode, deriveSpendingKeyZkBob } from "zkbob-client-js";
import { hexToBuf } from "zkbob-client-js/lib/utils";
import { config } from "../config";
interface Props {
  children: React.ReactNode;
}
interface IZkClientContext {
  zkClient: ZkBobClient | undefined,
  login: undefined | (() => Promise<void>),
  getMnemonic: () => string | undefined
};

const ZkClientContext = createContext<IZkClientContext>({
  zkClient: undefined,
  login: undefined,
  getMnemonic: () => undefined
});
export default ZkClientContext;

interface ZkClientProviderProps {
  children: ReactNode
}

export const MNEMONIC_KEY = 'mnemonic';
export const ZK_ADDRESS_KEY = 'zkAddress';

export const ZkClientProvider = (props: ZkClientProviderProps) => {

  const [zkClient, setZkClient] = useState<ZkBobClient | undefined>(undefined);
  const [mnemonic, setMnemonic] = useState<string | undefined>(undefined);

  async function login(): Promise<void> {
    const client = await ZkBobClient.create(config, 'WETH-goerli');
    const mnemonic = ethers.utils.entropyToMnemonic(hexToBuf("9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"))
    console.log("mnemonic: ", mnemonic);
    setMnemonic(mnemonic);
    localStorage.setItem(MNEMONIC_KEY, mnemonic);
    const accountConfig: AccountConfig = {
      sk: deriveSpendingKeyZkBob(mnemonic),
      pool: 'WETH-goerli',
      birthindex: -1,
      proverMode: ProverMode.Local,
    };
    console.log("jhbzhjv: ", accountConfig.sk.toString());
    localStorage.setItem(ZK_ADDRESS_KEY, accountConfig.sk.toString());
    await client.login(accountConfig);

    console.log(`Shielded account balance: ${await client.getTotalBalance()} Gwei`);
    console.log(client)
    setZkClient(client);
  }
  const getMnemonic = () => {
    return mnemonic;
  }

  return <ZkClientContext.Provider value={{ zkClient, login, getMnemonic }} >
    {props.children}
  </ZkClientContext.Provider>

}
