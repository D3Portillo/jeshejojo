import { useEffect, useRef, useState } from "react"
import { useContractRead } from "wagmi"

import getContract from "@/lib/getContract"
import Jeshe from "@/components/Jeshe"
import usePaginatedItems from "./usePaginatedItems"

const MeinJokes = getContract("MeinJokes")
function Feed({
  userCreatedItems = [],
  clearUserCreatedItems: clearUserItems,
}) {
  const ref = useRef()
  const [LAZY_FEED, setUserFeed] = useState([])
  const { data: totalItems } = useContractRead({
    addressOrName: MeinJokes.address,
    contractInterface: MeinJokes.abi,
    functionName: "totalItems",
    watch: true,
  })

  const asyncSetUserFeed = (newItems = []) =>
    setUserFeed((prev) => [...prev, ...newItems])

  const { fetchNextItems, mutableStore } = usePaginatedItems(totalItems, {
    onItemId: (id) => asyncSetUserFeed([makeFeedItem({ id })]),
    mockItems: 7,
  })

  function addItemToMutableStore(id) {
    const inStore = mutableStore.current.inStore[id]
    console.debug({ id, inStore })
    // NOTE: do not remove. Used to debug if false-positive user created item
    mutableStore.current.inStore[id] = true
    return inStore
  }

  const makeFeedItem = (props, overrides) => {
    return makeItem(props, {
      ...overrides,
      addItemToMutableStore,
    })
  }

  useEffect(() => {
    const THROTTLE_TIME = 200 // .2sec
    let lastThrottle = 0
    function handler(entries) {
      const target = entries[0]
      const now = Date.now()
      const timeDiff = now - lastThrottle
      if (target.isIntersecting && timeDiff > THROTTLE_TIME) {
        lastThrottle = now
        fetchNextItems()
      }
    }

    const observer = new IntersectionObserver(handler, {
      root: null,
      threshold: 0,
    })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    asyncSetUserFeed(
      [...userCreatedItems].map((item) =>
        makeFeedItem(item, {
          key: `jeshe-user-item-${item.content}-${item.bgColor}`,
        })
      )
    )
    clearUserItems()
  }, [userCreatedItems.length])

  return (
    <main className="relative flex min-h-screen flex-col flex-grow max-w-2xl space-y-2 mx-auto">
      {LAZY_FEED}
      <span className="absolute bottom-[-8.5rem]" ref={ref} />
    </main>
  )
}

function makeItem(props = {}, overrides = {}) {
  const { id } = props
  return <Jeshe {...props} key={`jeshe-item-${id}`} {...overrides} />
}

export default Feed
