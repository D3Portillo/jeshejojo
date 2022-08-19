import { useState } from "react"
import { useRouter } from "next/router"

import getContract from "@/lib/getContract"
import useRunIfTruthy from "@/lib/hooks/useRunIfTruthy"
import { noOp } from "@/lib/helpers"

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Jeshe from "@/components/Jeshe"

const MeinJokes = getContract("MeinJokes")
export default function Address() {
  const router = useRouter()
  const { address } = router.query
  const [userItems, setUserItems] = useState([])

  useRunIfTruthy(() => {
    MeinJokes.queryFilter(MeinJokes.filters.ListedItem(address, null))
      .then((items) => {
        return items.map(({ args }) => args.item_id)
      })
      .then(setUserItems)
      .catch(noOp)
  }, [address])
  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      <main className="flex flex-wrap -mx-2 md:px-4 items-center">
        {userItems.map((itemId, dirtyIdxAsKey) => {
          return (
            <div
              className="w-full md:w-1/2 xl:w-1/3 p-1 md:p-2"
              key={`user-address-listed-item-${dirtyIdxAsKey}`}
            >
              <Jeshe id={itemId} />
            </div>
          )
        })}
      </main>
      <Footer />
    </div>
  )
}
