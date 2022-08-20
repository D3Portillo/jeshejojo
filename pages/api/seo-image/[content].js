const TW_FONT_FAMILY =
  "font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"

/**
 * @param { import("next").NextApiRequest } req
 * @param { import("next").NextApiResponse } res
 */
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { content, bgColor, textColor } = req.query
    res.setHeader("Content-Type", "image/svg+xml")
    res.setHeader(
      "Cache-Control",
      "max-age=6000, s-maxage=7200, stale-while-revalidate"
    )
    res.send(
      `<svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
        <rect fill="#${bgColor}" width="1200" height="630" />
        <text
          x="50%"
          y="50%"
          fill="#${textColor}"
          style="${TW_FONT_FAMILY}; font-size: 42px"
          dominant-baseline="middle"
          text-anchor="middle"
         >${content}</text>
      </svg>`
    )
  } else {
    res.status(404).send({ error: "Route not found" })
  }
}
