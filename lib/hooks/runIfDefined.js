import { useEffect } from "react"

/**
 * Execute callback function if every item in `deps` is Truthy
 * @param { () => void } callback Executes if Array.every(Boolean)
 * @param { Array<any> } deps useEffect hook dependencies
 */
const useRunIfDefined = (callback = () => null, deps = []) => {
  useEffect(() => {
    const allTruthy = deps.every((dep) => dep === 0 || Boolean(dep))
    if (allTruthy) callback()
  }, [...deps])
}

export default useRunIfDefined
