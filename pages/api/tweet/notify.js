import getContract from "@/lib/getContract"
import getAirtableBase from "@/lib/getAirtableBase"

const AirtableBase = getAirtableBase()
const MeinJokes = getContract("MeinJokes")

/**
 * @param { import("next").NextApiRequest } req
 * @param { import("next").NextApiResponse } res
 */
export default async function handler(req, res) {
  const errorNoItemFound = () =>
    res.status(404).send({ error: "Item not found" })
  if (req.method === "POST") {
    const activity = req.body?.event?.activity
    const latestEvent = activity?.[0]
    if (latestEvent) {
      const ownerAddr = latestEvent.fromAddress
      MeinJokes.queryFilter(MeinJokes.filters.ListedItem(ownerAddr)).then(
        (events) => {
          const notifiedTx = events.find(({ transactionHash }) => {
            return transactionHash === latestEvent.hash
          })
          const { args } = notifiedTx || {}
          if (args) {
            const { item_id: id } = args
            const itemData = MeinJokes.getItemById(id)
            itemData.then((jeshejojo) => {
              AirtableBase.create({
                id: id.toNumber().toString(),
                content: jeshejojo.content,
                owner: ownerAddr,
              }).finally(() => res.json({ message: "Success" }))
            })
          } else errorNoItemFound()
        }
      )
    } else errorNoItemFound()
  } else {
    res.status(404).send({ error: "Route not found" })
  }
}
