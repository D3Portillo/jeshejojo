import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const TEST_NETS = ["goerli"]
const VERIFY_CONTRACTS = ["MeinJokes"]

const verifyContracts: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { name } = hre.network

  const deployed = await hre.deployments.all()
  if (TEST_NETS.includes(name)) {
    for (let name of VERIFY_CONTRACTS) {
      const contract = deployed[name]
      if (contract) {
        await hre.run("verify:verify", {
          address: contract.address,
        })
      } else throw `Could't find deployment for ${name}`
    }
  }
}

verifyContracts.runAtTheEnd = true
export default verifyContracts
