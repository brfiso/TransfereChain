import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { ThemeProvider } from './components/theme-provider'
import { ThirdwebProvider, embeddedWallet, metamaskWallet } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { AuthProvider } from "@/contexts/AuthContext"

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ThirdwebProvider 
           supportedWallets={[
            metamaskWallet(),
            embeddedWallet({
              auth: {
                options: ["email", "google"],
              },
            }),
          ]}
          activeChain={Sepolia} 
          clientId= {import.meta.env.VITE_PUBLIC_THIRDWEB_CLIENT_ID}
          >
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </ThirdwebProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
