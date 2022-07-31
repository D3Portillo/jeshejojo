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

  const paginatedItems = usePaginatedItems(totalItems, {
    currentPageIndex: 0,
  })
  const { items } = paginatedItems
  return (
    <main className="flex flex-col flex-grow max-w-2xl space-y-2 mx-auto">
      {items.map((item) => {
        return (
          <Jeshe
            id={item.id}
            bgColor={item.bgColor}
            textColor={item.textColor}
            content={item.content}
            author={item.author}
            key={`jeshe-render-item-${item.author}-${item.content}`}
          />
        )
      })}
    </main>
  )
}

export default Feed
