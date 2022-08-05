import { utils } from "ethers"

export const formatColor = (bytes) => `#${utils.toUtf8String(bytes)}`

export const getIdFromTransaction = (transaction = {}) => {
  const { events = [] } = transaction
  const { args = [] } = events[0] ?? {}
  return args[1]
}

export const LIKE_TYPES = [
  { type: "heart", icon: "😍" },
  { type: "chad", icon: "🥵" },
  { type: "clown", icon: "🤡" },
]
