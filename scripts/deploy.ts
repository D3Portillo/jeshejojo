import { ethers } from "hardhat"

const main = async () => {
  try {
    const waveContractFactory = await ethers.getContractFactory("MeinJokes")
    const waveContract = await waveContractFactory.deploy()
    await waveContract.deployed()
    console.log("Contract deployed to:", waveContract.address)
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

main()
