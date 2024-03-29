import Link from "next/link"
import { useState } from "react"
import { useAccount } from "wagmi"

import services from "@/lib/services"
import { noOp } from "@/lib/helpers"
import getContract from "@/lib/getContract"
import prettyNumber from "@/lib/prettyNumber"
import useRunIfTruthy from "@/lib/hooks/useRunIfTruthy"

import SvgContent from "@/components/SvgContent"
import ErrorMessage from "@/components/ErrorMessage"
import { formatColor, getIdFromTransaction, LIKE_TYPES } from "./internals"
import NavigationTitle from "./NavigationTitle"
import LikeButton from "./LikeButton"

const MeinJokes = getContract("MeinJokes")
function Jeshe({
  id: _id,
  author: _author,
  content: _content,
  bgColor: _bgColor,
  textColor: _textColor,
  addItemToMutableStore,
  waitForTx,
}) {
  const { address } = useAccount()
  const [forceUnmount, setForceUnmount] = useState(false)
  const [showUnmountMessage, setShowUnMountMessage] = useState(false)
  const [likes, setLikes] = useState({ chad: [], clown: [], heart: [] })
  const [txHash, setTxHash] = useState()
  const [userLikes, setUserLikes] = useState({
    chad: false,
    clown: false,
    heart: false,
  })
  const [metadata, setMetadata] = useState({
    id: _id,
    author: _author,
    content: _content,
    bgColor: _bgColor,
    textColor: _textColor,
  })
  const { id, author, bgColor, content, textColor } = metadata
  /** Force component to render `null` */
  const forceDetachComponent = () => setForceUnmount(true)

  // Semantical Negative-State flags
  const isUndefinedId = id === undefined
  const isUndefinedContent = content === undefined

  useRunIfTruthy(() => {
    waitForTx.then((receipt = {}) => {
      const { hash, wait } = receipt
      if (hash) {
        setTxHash(hash)
        wait()
          .then((transaction) => {
            const id = getIdFromTransaction(transaction)
            if (id) {
              const rawId = id.toNumber()
              const itemNotInFeedRender = !addItemToMutableStore(rawId)
              if (itemNotInFeedRender) {
                setMetadata((metadata) => ({ ...metadata, id: rawId }))
              } else forceDetachComponent()
            }
          })
          .catch((_) => {
            // Show Error State & unmount
            setShowUnMountMessage(true)
          })
      }
    })
  }, [isUndefinedId && waitForTx])

  useRunIfTruthy(() => {
    MeinJokes.queryFilter(MeinJokes.filters.ListedItem(null, id)).then(
      (result) => {
        const { transactionHash } = result[0] || {}
        setTxHash((prev) => transactionHash || prev)
      }
    )
  }, [id])

  useRunIfTruthy(() => {
    // `id` is defined but content is missing
    // We fetch data from contract and update metadata
    if (!content) {
      MeinJokes.getItemById(id)
        .then(({ author, bgColor, content, textColor }) => {
          setMetadata({
            author,
            bgColor: formatColor(bgColor),
            textColor: formatColor(textColor),
            content,
            id,
          })
        })
        .catch(noOp)
    }
  }, [id])

  useRunIfTruthy(() => {
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
  }, [id, address || true])

  const handleLike = (type) => {
    if (!address || isUndefinedId) {
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

  const isMock = isUndefinedId || isUndefinedContent
  if (forceUnmount) return null
  return (
    <section className="w-full hover:ring-2 ring-slate-100 shadow sm:shadow-none sm:border py-4 sm:rounded-lg text-black text-xl">
      <NavigationTitle
        isMock={isMock}
        author={waitForTx ? address : author}
        txHash={txHash}
      />
      <Link href={id === undefined ? "#" : `/id/${id}`}>
        <a
          className={`w-full block relative cursor-pointer my-4 select-none ${
            isMock && "animate-pulse"
          }`}
        >
          {showUnmountMessage && (
            <ErrorMessage onActionPressed={forceDetachComponent} />
          )}
          <SvgContent text={content} bgColor={bgColor} textColor={textColor} />
        </a>
      </Link>
      <div className="px-4 flex space-x-1 font-bold">
        {LIKE_TYPES.map(({ type, icon }) => {
          return (
            <LikeButton
              key={`like-type-button-${type}`}
              onClick={() => handleLike(type)}
              isMock={isMock || showUnmountMessage}
              isActive={userLikes[type]}
            >
              {icon} {prettyNumber(likes[type].length)}
            </LikeButton>
          )
        })}
      </div>
    </section>
  )
}

export default Jeshe
