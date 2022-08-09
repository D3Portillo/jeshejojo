import { utils } from "ethers"

export const ELEMENT_VOID = {
  content: "",
  bgColor: 0n,
  textColor: 0n,
  author: 0n,
}

export const ELEMENT_MOCK = {
  content: "MOCK_CONTENT",
  bgColor: utils.toUtf8Bytes("FFFFFF"),
  textColor: utils.toUtf8Bytes("000000"),
}
