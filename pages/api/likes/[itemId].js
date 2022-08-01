/**
 * @typedef LikeTypes
 * @type {"heart" | "clown" | "chad"}
 */

import { Redis } from "@upstash/redis"

/**
 * @param { string | number } id
 * @param { LikeTypes } type
 */
const getStoreName = (id = "", type = "heart") => `${id}.likes.${type}`

/**
 * @param { import("next").NextApiRequest } req
 * @param { import("next").NextApiResponse } res
 */
export default async function handler(req, res) {
  if (req.method === "GET") {
    const redis = Redis.fromEnv()
    const { itemId: id } = req.query
    const stores = {
      heart: getStoreName(id, "heart"),
      clown: getStoreName(id, "clown"),
      chad: getStoreName(id, "chad"),
    }
    const chad = await redis.smembers(stores.chad)
    const clown = await redis.smembers(stores.clown)
    const heart = await redis.smembers(stores.heart)
    /**
     * Data fresh for 15sec
     * Validate after 1min
     */
    res.setHeader(
      "Cache-Control",
      "max-age=15, s-maxage=60, stale-while-revalidate"
    )
    res.json({
      chad,
      clown,
      heart,
    })
  } else {
    res.status(404).send({ error: "Route not found" })
  }
}
