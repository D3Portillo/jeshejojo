import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-chai-matchers";
import "dotenv/config"
import "hardhat-deploy"

const GOERLI_ALCHEMY_URL = process.env.GOERLI_ALCHEMY_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY!

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      live: false,
      saveDeployments: true,
    },
    goerli: {
      live: true,
      url: GOERLI_ALCHEMY_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
}

export default config
