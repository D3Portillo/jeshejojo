import { useState } from "react"

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

export default useStatefullArray
