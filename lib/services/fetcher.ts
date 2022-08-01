interface FetcherOptions<B, Q> {
  body?: B
  query: Q
}
type Endpoint = "/likes/:id" | "/likes/set"
type Options<B, Q> = Omit<RequestInit, "body"> & FetcherOptions<B, Q>

function fetcher<B, Q>(endpoint: Endpoint, options?: Options<B, Q>) {
  const { body, headers } = options || {}
  return fetch("/api" + replaceQueryData(endpoint, options?.query), {
    ...options,
    body: body ? JSON.stringify(body) : undefined,
    method: body ? "POST" : options?.method,
    headers: body
      ? {
          ...headers,
          "Content-Type": "application/json",
        }
      : headers,
  }).then((r) => r.json())
}

const replaceQueryData = (endpoint = "", data = {} as any) => {
  Object.keys(data).forEach((prop) => {
    const queryName = `:${prop}`
    endpoint = endpoint.replace(queryName, `${data[prop]}`)
  })
  return endpoint
}

export default fetcher
