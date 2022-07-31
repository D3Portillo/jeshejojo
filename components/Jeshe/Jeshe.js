import { useEffect, useState } from "react"
import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"

import getContract from "@/lib/getContract"
import SvgContent from "@/components/SvgContent"

function getBeautyAddress(address = "") {
  if (!address) return "N/A"
  return `${address.substr(0, 4)}...${address.substr(-4, 4)}`
}

function Jeshe({
  id = 0,
  author = "",
  love = 0,
  hot = 0,
  clown = 0,
  content = "",
  bgColor = "white",
  textColor = "black",
}) {
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
        <button className="hover:bg-zinc-100 py-1 px-2 rounded-lg">
          😍 {love}K
        </button>
        <button className="hover:bg-zinc-100 py-1 px-2 rounded-lg">
          🥵 {hot}K
        </button>
        <button className="bg-pink-300 hover:bg-zinc-100 py-1 px-2 rounded-lg">
          🤡 {clown}K
        </button>
      </div>
    </blockquote>
  )
}

export default Jeshe
