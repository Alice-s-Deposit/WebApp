import { publicProvider } from 'wagmi/providers/public';
import { goerli } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
const { chains, publicClient, webSocketPublicClient } = configureChains([goerli], [publicProvider()]);
const injected = new InjectedConnector({
    chains,
    options: {
        name: 'MetaMask',
    },
});
const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
    // connectors: [injected, walletConnectV1]
});
// const walletConnectV1 = new WalletConnectLegacyConnector({
//     chains,
//     options: {
//         qrcode: true,
//     },
// });
// const walletConnectV2 = new WalletConnectConnector({
//   chains,
//   options: {
//     qrcode: true,
//     projectId: process.env.REACT_APP_WALLETCONNECT_PROJECT_ID,
//     name: 'zkBob',
//     relayUrl: 'wss://relay.walletconnect.org'
//   },
// });
export default (props) => (<WagmiConfig config={config}>
        {props.children}
    </WagmiConfig>);
