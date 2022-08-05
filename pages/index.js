import { useState } from "react"

import CreateButton from "@/components/CreateButton"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Feed from "@/components/Feed"

export default function Home() {
  const {
    items: userItems,
    pushItem,
    forceSetItems: clearUserItems,
  } = useStatefullArray()

  return (
    <div className="min-h-screen">
      <Header />
      <Feed
        clearUserCreatedItems={clearUserItems}
        userCreatedItems={userItems}
      />
      <CreateButton onCreateItem={pushItem} />
      <Footer />
    </div>
  )
}

function useStatefullArray(initState = []) {
  const [items, setItems] = useState(initState)

  function pushItem(item) {
    setItems((arr) => [...arr, item])
  }
  function forceSetItems(items = []) {
    setItems(items)
  }

  return { items, pushItem, forceSetItems }
}
