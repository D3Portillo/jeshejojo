import fetcher from "./fetcher"

function getLikes(id: string) {
  return fetcher<any, { id: string }>("/likes/:id", {
    query: { id },
  }) as Promise<{
    chad: Array<string>
    clown: Array<string>
    heart: Array<string>
  }>
}

export default getLikes
