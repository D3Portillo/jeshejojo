import { useEffect, useRef, useState } from "react"
import { BigNumber } from "ethers"

const ZERO = BigNumber.from(0)
const PER_FETCH_ITEMS = 5

function usePaginatedItems(
  totalItems = ZERO,
  {
    onItemId,
    mockItems = 0,
  }: { mockItems: number; onItemId: (id: number) => void }
) {
  const mutableStore = useRef({
    inStore: {} as { [key: number]: any },
    fetchedItems: 0,
  })
  const [fetch, setFetch] = useState(0)
  const fetchNextItems = () => setFetch((n) => n + 1)

  useEffect(() => {
    const rawTotalItems = totalItems.toNumber()
    const status = mutableStore.current
    // Fetch id's starting from latest fetched id number value
    let id = status.fetchedItems
    const chunkLimit = id == 0 ? mockItems : PER_FETCH_ITEMS + id
    const omegaLimit = rawTotalItems == 0 ? mockItems : rawTotalItems
    console.debug({ fetchStartId: id, omegaLimit, chunkLimit, rawTotalItems })
    for (; id < chunkLimit && id < omegaLimit; ++id) {
      // Yield item id to render mock-ish component
      if (!status.inStore[id]) {
        onItemId(id)
      }
      mutableStore.current.inStore[id] = true
      mutableStore.current.fetchedItems = id
    }
  }, [fetch])

  return { fetchNextItems, mutableStore }
}

export default usePaginatedItems
