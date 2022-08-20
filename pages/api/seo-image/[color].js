/**
 * @param { import("next").NextApiRequest } req
 * @param { import("next").NextApiResponse } res
 */
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { color } = req.query
    res.setHeader("Content-Type", "image/svg+xml")
    res.setHeader(
      "Cache-Control",
      "max-age=6000, s-maxage=7200, stale-while-revalidate"
    )
    res.send(
      `<svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg"><rect fill="#${color}" width="1200" height="630" /></svg>`
    )
  } else {
    res.status(404).send({ error: "Route not found" })
  }
}
