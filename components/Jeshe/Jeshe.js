import { useState } from "react"
import { useAccount } from "wagmi"

import services from "@/lib/services"
import getContract from "@/lib/getContract"
import prettyNumber from "@/lib/prettyNumber"
import useRunIfDefined from "@/lib/hooks/runIfDefined"

import SvgContent from "@/components/SvgContent"
import NavigationTitle from "./NavigationTitle"
import LikeButton from "./LikeButton"

function Jeshe({
  id,
  author = "",
  content = "",
  bgColor = "white",
  textColor = "black",
  isMock = false,
}) {
  const isNotMock = !isMock
  const { address } = useAccount()
  const [likes, setLikes] = useState({ chad: [], clown: [], heart: [] })
  const [userLikes, setUserLikes] = useState({
    chad: false,
    clown: false,
    heart: false,
  })
  const [txHash, setTxHash] = useState()

  useRunIfDefined(() => {
    const contract = getContract("MeinJokes")
    contract
      .queryFilter(contract.filters.ListedItem(null, id))
      .then((result) => {
        const { transactionHash } = result[0] || {}
        setTxHash(transactionHash)
      })
  }, [id, isNotMock])

  useRunIfDefined(() => {
    services.getLikes(id).then((likes) => {
      setLikes(likes)
      if (address) {
        setUserLikes({
          chad: likes.chad.includes(address),
          clown: likes.clown.includes(address),
          heart: likes.heart.includes(address),
        })
      }
    })
  }, [id, address || true, isNotMock])

  const handleLike = (type) => {
    if (!address || isMock) {
      console.error(`handleLike:: Cannot execute this action`)
      return
    }
    const newLikeState = !userLikes[type]
    /** @type { Array<string> } */
    const newLikeArr = likes[type]
    if (newLikeState) {
      // User giving a like
      newLikeArr.push("0x0")
    } else {
      // User giving a dislike
      newLikeArr.pop()
    }
    setUserLikes({ ...userLikes, [type]: newLikeState })
    setLikes({ ...likes, [type]: newLikeArr })
    services.setLikes({
      address,
      id,
      type,
    })
  }

  return (
    <section className="w-full shadow sm:shadow-none sm:border py-4 sm:rounded-lg text-black text-xl">
      <NavigationTitle isMock={isMock} author={author} txHash={txHash} />
      <div className={`w-full my-4 select-none ${isMock && "animate-pulse"}`}>
        <SvgContent text={content} bgColor={bgColor} textColor={textColor} />
      </div>
      <div className="px-4 flex space-x-1 font-bold">
        <LikeButton
          onClick={() => handleLike("heart")}
          isMock={isMock}
          isActive={userLikes.heart}
        >
          😍 {prettyNumber(likes.heart.length)}
        </LikeButton>
        <LikeButton
          onClick={() => handleLike("chad")}
          isMock={isMock}
          isActive={userLikes.chad}
        >
          🥵 {prettyNumber(likes.chad.length)}
        </LikeButton>
        <LikeButton
          onClick={() => handleLike("clown")}
          isMock={isMock}
          isActive={userLikes.clown}
        >
          🤡 {prettyNumber(likes.clown.length)}
        </LikeButton>
      </div>
    </section>
  )
}

export default Jeshe
