/**
 * Validates if NODE_ENV === "development"
 */
export const isDevEnv = () => process.env.NODE_ENV === "development"

export const noOp = () => null

export function getBeautyAddress(address = "") {
  if (!address) return "N/A"
  return `${address.substr(0, 4)}...${address.substr(-4, 4)}`
}
