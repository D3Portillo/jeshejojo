import { ethers } from "hardhat"
import { expect } from "chai"
import { MeinJokes as MeinJokesType } from "typechain-types"

import { ELEMENT_MOCK, ELEMENT_VOID } from "./constants"

describe("MeinJokes", () => {
  let MeinJokes: MeinJokesType

  async function deployContract() {
    const factory = await ethers.getContractFactory("MeinJokes")
    const contract = await factory.deploy()
    await contract.deployed()
    return contract
  }

  before(async () => {
    MeinJokes = await deployContract()
  })

  it("State variables should be zero-ish at deployment", () => {
    expect(MeinJokes.totalItems()).eventually.equal(0n)
    expect(MeinJokes.getItemById(0)).eventually.include(ELEMENT_VOID)
  })

  it("Should emit ListedItem", async () => {
    const { content, bgColor, textColor } = ELEMENT_MOCK
    await expect(MeinJokes.listItem(content, bgColor, textColor)).emit(
      MeinJokes,
      "ListedItem"
    )
    expect(MeinJokes.totalItems()).eventually.equal(1n)
  })

  it("Should revert with empty string(content)", async () => {
    const { bgColor, textColor } = ELEMENT_MOCK
    await expect(MeinJokes.listItem("", bgColor, textColor)).revertedWith(
      "String cannot be empty"
    )
    expect(MeinJokes.totalItems()).eventually.equal(1n)
  })

  it("Should revert with empty string(content).size greater than 200", async () => {
    const { bgColor, textColor } = ELEMENT_MOCK
    // reverts if string.size > 221
    await MeinJokes.listItem("A".repeat(221), bgColor, textColor)
    expect(MeinJokes.totalItems()).eventually.equal(2n)
    // * trigger revert
    // NOTE: `221` is an arbitrary value to allow some larger UTF chars
    // to be added. Do not take as reference
    await expect(
      MeinJokes.listItem("A".repeat(222), bgColor, textColor)
    ).revertedWith("String.size cannot greater than 200")
    expect(MeinJokes.totalItems()).eventually.equal(2n)
  })
})
