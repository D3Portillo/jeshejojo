import { useEffect, useRef, useState } from "react"
import { useContractRead } from "wagmi"

import getContract from "@/lib/getContract"
import Jeshe from "@/components/Jeshe"
import usePaginatedItems from "./usePaginatedItems"

const MeinJokes = getContract("MeinJokes")
function Feed({ userCreatedItems = [], clearUserCreatedItems }) {
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

  const { fetchNextItems } = usePaginatedItems(totalItems, {
    onItemId: (id) => asyncSetUserFeed([makeItem({ id })]),
    mockItems: 7,
  })

  useEffect(() => {
    const THROTTLE_TIME = 1200 // 1.2sec
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
      rootMargin: "48px",
      threshold: 0,
    })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    asyncSetUserFeed(
      [...userCreatedItems].map((item) =>
        makeItem(item, {
          key: `jeshe-user-item-${item.content}-${item.bgColor}`,
        })
      )
    )
    clearUserCreatedItems()
  }, [userCreatedItems.length])

  return (
    <main className="relative flex min-h-screen flex-col flex-grow max-w-2xl space-y-2 mx-auto">
      {LAZY_FEED}
      <span className="absolute bottom-0" ref={ref} />
    </main>
  )
}

function makeItem(props = {}, overrides = {}) {
  const { id } = props
  return <Jeshe {...props} key={`jeshe-item-${id}`} {...overrides} />
}

export default Feed
