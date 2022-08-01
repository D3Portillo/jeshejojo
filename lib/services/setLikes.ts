import fetcher from "./fetcher"

type Body = { id: string | number; address: string; type: string }

function setLikes(body: Body) {
  const { address, id } = body
  if (!address || !id) return Promise.resolve()
  return fetcher<Body, any>("/likes/set", {
    body,
    query: {},
  })
}

export default setLikes
