import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { isDevEnv } from "@/lib/helpers"

const IS_DEV = isDevEnv()
export const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli, ...(IS_DEV ? [chain.hardhat] : [/** chain.mainnet, chain.polygon */ ])],
  [
    alchemyProvider({ alchemyId: process.env.AlCHEMY_API_KEY }),
    publicProvider(),
  ]
)

const { connectors } = getDefaultWallets({
  appName: "Jeshejojo",
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

function DappProvider({ children = null }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}

export default DappProvider
