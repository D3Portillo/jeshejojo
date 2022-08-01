import { useEffect, useState } from "react"
import { BigNumber, utils } from "ethers"
import getContract from "@/lib/getContract"

const formatColor = (bytes: string = "") => `#${utils.toUtf8String(bytes)}`
const MeinJokes = getContract("MeinJokes")
const ZERO = BigNumber.from(0)
const PAGE_SIZE = 10

type Item = {
  id: number
  author: string
  bgColor: string
  textColor: string
  content: string
  owner: string
}

function usePaginatedItems(
  totalItems = ZERO,
  { currentPageIndex }: { currentPageIndex: number }
): {
  pages: number
  currentPageIndex: number
  currentPage: number
  items: Array<Item>
  zeroNodeIdx: number
  lastItemIdx: number
} {
  const [state, setState] = useState({
    pages: 0,
    currentPageIndex: 0,
    currentPage: 0,
    items: [] as Array<Item>,
    zeroNodeIdx: 0,
    lastItemIdx: 0,
  })

  const rawTotalItems = totalItems.toNumber()

  useEffect(() => {
    const ids = []
    const currentPage = currentPageIndex + 1
    // If rawTotalItems===0, then pages = 0
    const pages = BigNumber.from(rawTotalItems ? 1 : 0)
      .add(totalItems.div(PAGE_SIZE))
      .toNumber()
    let startItemIndex = PAGE_SIZE * currentPageIndex
    const zeroNodeIdx = startItemIndex
    const lastItemIdx = Math.max(rawTotalItems - 1, 0) // input: -n,...-1 -> 0
    for (
      ;
      startItemIndex < PAGE_SIZE && startItemIndex < rawTotalItems;
      ++startItemIndex
    ) {
      ids.push(startItemIndex)
    }
    Promise.all(
      ids.map((id) =>
        MeinJokes.getItemById(id).then(
          ({ author, bgColor, content, owner, textColor }: Partial<Item>) => ({
            author,
            bgColor: formatColor(bgColor),
            textColor: formatColor(textColor),
            content,
            owner,
            id,
          })
        )
      )
    ).then((items) => {
      setState({
        zeroNodeIdx,
        lastItemIdx,
        currentPage,
        currentPageIndex,
        items: items as any,
        pages,
      })
    })
  }, [rawTotalItems, currentPageIndex])

  return state
}

export default usePaginatedItems
