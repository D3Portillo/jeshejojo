import { useEffect } from "react"
import { noOp } from "@/lib/helpers"

/**
 * Execute callback function if every item in `deps` is Truthy
 * @param { () => void } callback Executes if Array.every(Boolean)
 * @param { Array<any> } deps useEffect hook dependencies
 */
const useRunIfTruthy = (callback = noOp, deps = []) => {
  useEffect(() => {
    const allTruthy = deps.every((dep) => dep === 0 || Boolean(dep))
    if (allTruthy) callback()
  }, [...deps])
}

export default useRunIfTruthy
