import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { isDevEnv } from "@/lib/helpers"

const IS_DEV = isDevEnv()
const API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_KEY
export const { chains, provider } = configureChains(
  [
    chain.goerli,
    ...(IS_DEV
      ? [chain.hardhat]
      : [
          /** chain.mainnet, chain.polygon */
        ]),
  ],
  [alchemyProvider({ alchemyId: API_KEY }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "Jeshejojo",
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function DappProvider({ children = null }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  )
}

export default DappProvider
