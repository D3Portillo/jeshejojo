import { useEffect, useState } from "react"
import { BigNumber, utils } from "ethers"
import getContract from "@/lib/getContract"

const formatColor = (bytesColor: string) => "#" + utils.toUtf8String(bytesColor)
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
} {
  const [state, setState] = useState({
    pages: 0,
    currentPageIndex: 0,
    currentPage: 0,
    items: [] as Array<Item>,
  })

  const rawTotalItems = totalItems.toNumber()

  useEffect(() => {
    const ids = []
    const currentPage = currentPageIndex + 1
    const pages = BigNumber.from(rawTotalItems ? 1 : 0)
      .add(totalItems.div(PAGE_SIZE))
      .toNumber()
    let startItemIndex = PAGE_SIZE * currentPageIndex
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
          ({ author, bgColor, content, owner, textColor }) => ({
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
        currentPage,
        currentPageIndex,
        items,
        pages,
      })
    })
  }, [rawTotalItems, currentPageIndex])

  return state
}

export default usePaginatedItems
