import { useEffect, useState } from "react"
import Link from "next/link"
import { useAccount } from "wagmi"
import { FiArrowUpRight } from "react-icons/fi"

import services from "@/lib/services"
import getContract from "@/lib/getContract"
import prettyNumber from "@/lib/prettyNumber"

import SvgContent from "@/components/SvgContent"
import LikeButton from "./LikeButton"

function Jeshe({
  id = 0,
  author = "",
  content = "",
  bgColor = "white",
  textColor = "black",
}) {
  const { address } = useAccount()
  const [likes, setLikes] = useState({ chad: [], clown: [], heart: [] })
  const [userLikes, setUserLikes] = useState({
    chad: false,
    clown: false,
    heart: false,
  })
  const [txHash, setTxHash] = useState()
  const prettyAuthor = getBeautyAddress(author)
  useEffect(() => {
    const contract = getContract("MeinJokes")
    contract
      .queryFilter(contract.filters.ListedItem(null, id))
      .then((result) => {
        const { transactionHash } = result[0] || {}
        setTxHash(transactionHash)
      })
  }, [id])

  useEffect(() => {
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
  }, [address])

  const handleLike = (type) => {
    if (!address) {
      console.error(`Must login to like Item.id=${id}`)
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
    <blockquote
      cite={`https://etherscan.io/address/${author}`}
      className="w-full shadow sm:shadow-none sm:border py-4 sm:rounded-lg text-black text-xl"
    >
      <div className="px-4 flex items-center justify-between">
        <span className="text-gray-500 text-sm">
          Posted by
          <Link href={`https://goerli.etherscan.io/address/${author}`}>
            <a
              className="text-sm group inline-flex space-x-1 items-center hover:bg-zinc-100 py-1 px-2 rounded-lg"
              target="_blank"
            >
              <span>{prettyAuthor}</span>
              <FiArrowUpRight className="group-hover:scale-110" />
            </a>
          </Link>
        </span>
        <Link href={`https://goerli.etherscan.io/tx/${txHash}`}>
          <a
            className="text-sm group inline-flex space-x-1 items-center hover:bg-zinc-100 py-1 px-2 rounded-lg"
            target="_blank"
          >
            <span>
              <span className="hidden sm:inline">View</span> TX
            </span>
            <FiArrowUpRight className="group-hover:scale-110" />
          </a>
        </Link>
      </div>
      <div className="w-full my-4 select-none">
        <SvgContent text={content} bgColor={bgColor} textColor={textColor} />
      </div>
      <div className="px-4 flex space-x-1 font-bold">
        <LikeButton
          onClick={() => handleLike("heart")}
          isActive={userLikes.heart}
        >
          😍 {prettyNumber(likes.heart.length)}
        </LikeButton>
        <LikeButton
          onClick={() => handleLike("chad")}
          isActive={userLikes.chad}
        >
          🥵 {prettyNumber(likes.chad.length)}
        </LikeButton>
        <LikeButton
          onClick={() => handleLike("clown")}
          isActive={userLikes.clown}
        >
          🤡 {prettyNumber(likes.clown.length)}
        </LikeButton>
      </div>
    </blockquote>
  )
}

function getBeautyAddress(address = "") {
  if (!address) return "N/A"
  return `${address.substr(0, 4)}...${address.substr(-4, 4)}`
}

export default Jeshe
