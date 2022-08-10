import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-etherscan";

import "dotenv/config"
import "hardhat-deploy"

const GOERLI_ALCHEMY_URL = process.env.GOERLI_ALCHEMY_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY!
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY

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
  etherscan: {
    apiKey: ETHERSCAN_KEY
  }
}

export default config
