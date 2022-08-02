import { useContractRead } from "wagmi"

import getContract from "@/lib/getContract"
import Jeshe from "@/components/Jeshe"
import usePaginatedItems from "./usePaginatedItems"

const MeinJokes = getContract("MeinJokes")
function Feed() {
  const { data: totalItems } = useContractRead({
    addressOrName: MeinJokes.address,
    contractInterface: MeinJokes.abi,
    functionName: "totalItems",
    watch: true,
  })

  const { items, zeroNodeIdx, lastItemIdx } = usePaginatedItems(totalItems, {
    currentPageIndex: 0,
  })

  return (
    <main className="flex flex-col flex-grow max-w-2xl space-y-2 mx-auto">
      {withMockItems(items, {
        zeroNodeIdx,
        totalMockItems: 7,
      }).map((item) => {
        const { id } = item
        if (lastItemIdx > 0 && id > lastItemIdx) return null
        return (
          <Jeshe
            isMock={item.isMock}
            id={id}
            bgColor={item.bgColor}
            textColor={item.textColor}
            content={item.content}
            author={item.author}
            key={`jeshe-render-item-${id}`}
          />
        )
      })}
    </main>
  )
}

function withMockItems(items = [], { totalMockItems, zeroNodeIdx }) {
  if (items.length > totalMockItems) return items
  return [...new Array(totalMockItems)].map((_, idx) => {
    const id = zeroNodeIdx + idx
    const itemData = items[id]
    if (itemData) return itemData
    return {
      id,
      isMock: true,
      bgColor: "#f1f1f1",
    }
  })
}

export default Feed
