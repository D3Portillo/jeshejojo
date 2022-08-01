import { Redis } from "@upstash/redis"

const definedWithSize = (isDefined, minSize = 1) => {
  return typeof isDefined !== "undefined" && `${isDefined}`.length >= minSize
}

/**
 * @param { import("next").NextApiRequest } req
 * @param { import("next").NextApiResponse } res
 */
export default async function handler(req, res) {
  if (req.method === "POST") {
    /**
     * @type {{ type: ("heart" | "clown" | "chad"), id: string, address: string }}
     */
    const { id, address, type = "heart" } = req.body
    if (definedWithSize(id) && definedWithSize(address, 4)) {
      const store = `${id}.likes.${type}`
      const redis = Redis.fromEnv()
      // Remove this like from store for `address`
      const rmStatus = await redis.srem(store, `${address}`)
      if (rmStatus === 0) {
        // If nothing removed this means the user isn't "disliking"
        // Thus we continue to SADD
        await redis.sadd(store, `${address}`)
      }
      res.json({ message: "Success" })
    } else {
      res.status(400).send("Bad Request")
    }
  } else {
    res.status(404).send("Route not found")
  }
}
