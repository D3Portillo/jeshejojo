import { Contract, utils } from "ethers"
import { provider } from "@/components/DappProvider"

import CONTRACTS_LOCALHOST from "@/lib/abi/localhost.json"
import CONTRACTS_GOERLI from "@/lib/abi/goerli.json"
import CONTRACTS_MAINNET from "@/lib/abi/mainnet.json"

/** @ts-ignore */
import { MeinJokes as MeinJokesType } from "../typechain-types"
const CONTRACTS = {
  localhost: CONTRACTS_LOCALHOST,
  goerli: CONTRACTS_GOERLI,
  mainnet: CONTRACTS_MAINNET,
}

const CURRENT_CHAIN_NAME = (() => {
  if (typeof window === "undefined") return "goerli"
  const rawStore = localStorage.getItem("wagmi.store") || "{}"
  const wagmiStore = JSON.parse(JSON.parse(rawStore))
  const networkId = wagmiStore.state?.data?.chain?.id
  switch (networkId) {
    case 1:
      return "mainnet"
    case 31337:
      return "localhost"
    default:
      return "goerli"
  }
})() as "localhost"

console.debug({ CURRENT_CHAIN_NAME })
const CONTRACT_LIST = CONTRACTS[CURRENT_CHAIN_NAME]

/**
 * Here define all your contract types
 * [ContractName] : [ContractTypeDef]
 */
interface ContractTypeByName {
  MeinJokes: MeinJokesType
}
// Enum all your contract definitions
type ContractNames = keyof ContractTypeByName
type ContractWithType<T extends ContractNames> = ContractTypeByName[T] & {
  abi: []
}

export default function getContract<T extends ContractNames>(
  name: T
): ContractWithType<T> {
  const RAW_CONTRACT = CONTRACT_LIST.contracts[name]
  if (!RAW_CONTRACT) return {} as any
  const { abi, address } = RAW_CONTRACT
  const iface = new utils.Interface(abi)
  const readProvider = provider({ chainId: parseInt(CONTRACT_LIST.chainId) })
  const contract = new Contract(address, iface, readProvider) as any
  contract.abi = iface.format(utils.FormatTypes.minimal)
  return contract
}
