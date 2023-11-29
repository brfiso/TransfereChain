import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { ThemeProvider } from './components/theme-provider'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export function App() {
  const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora],
    [
      alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
      publicProvider()
    ]
  );
  const { connectors } = getDefaultWallets({
    appName: 'Tesouro em Bytes',
    projectId: import.meta.env.VITE_PROJECT_ID,
    chains
  });
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider locale='pt-BR' chains={chains} modalSize='compact'>
          <BrowserRouter>
            <Router/>
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}
