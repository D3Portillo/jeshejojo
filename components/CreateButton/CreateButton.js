import { useCallback, useEffect, useState } from "react"
import { useAccount, useContractWrite } from "wagmi"
import { useConnectModal } from "@rainbow-me/rainbowkit"
import { utils } from "ethers"
import { HiArrowRight } from "react-icons/hi"
import toast from "react-hot-toast"

import { MdFormatColorText, MdOutlineFormatColorFill } from "react-icons/md"

import getContract from "@/lib/getContract"
import sanitizeText from "@/lib/sanitizeText"
import { isDevEnv, noOp } from "@/lib/helpers"

import SvgContent, {
  getContentTextSize,
  SIZE as SVG_SIZE,
} from "@/components/SvgContent"
import Modal from "@/components/Modal"
import ColorPicker from "./ColorPicker"
import SizeLeftCounter from "./SizeLeftCounter"
import VerticalTextArea from "./VerticalTextArea"
import FloatingActionButton from "./FloatingActionButton"

const MeinJokes = getContract("MeinJokes")
const INIT_ITEM_STATE = {
  bgColor: "#ffffff",
  textColor: "#000000",
  message: "",
  textSize: 120,
  scale: 1,
}
/** @type { HTMLDivElement } */
const MOCK_DIV = {}
function CreateButton({ onCreateItem }) {
  const { isConnected: isUserConnected } = useAccount()
  const { openConnectModal = noOp } = useConnectModal()
  const [svgContainer, setSvgContainer] = useState(MOCK_DIV)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemConfig, setItemConfig] = useState(INIT_ITEM_STATE)
  const { writeAsync, isLoading } = useContractWrite({
    addressOrName: MeinJokes.address,
    contractInterface: MeinJokes.abi,
    functionName: "listItem",
  })
  /** @type { MeinJokes["listItem"] } */
  const listItem = (...args) => writeAsync({ args })

  /**
   * @param { itemConfig } newConfig
   */
  const asyncSetItemConfig = (newConfig) =>
    setItemConfig((config) => ({
      ...config,
      ...newConfig,
    }))

  const closeModal = () => {
    setItemConfig(INIT_ITEM_STATE)
    setIsModalOpen(false)
  }
  const openModal = () => setIsModalOpen(true)

  function handleCreate() {
    const { message, bgColor, textColor } = itemConfig
    if (!isUserConnected) {
      openConnectModal()
      return
    }
    if (!message?.trim()) {
      toast.error("Message can't be empty")
      return
    }
    const waitForTx = listItem(
      message,
      utils.toUtf8Bytes(bgColor.replace("#", "")),
      utils.toUtf8Bytes(textColor.replace("#", ""))
    )
    waitForTx
      .then(() => {
        closeModal()
        onCreateItem({
          content: message,
          bgColor,
          textColor,
          waitForTx,
        })
        setTimeout(() => {
          document.body.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "end",
          })
        })
      })
      .catch(noOp)
    // No error handling - User denied transaction
  }

  const handleItemMessage = (rawMessage = "") => {
    const message = sanitizeText(rawMessage)
    asyncSetItemConfig({
      message,
      textSize: getContentTextSize(message),
    })
  }

  useEffect(() => {
    const { width } = svgContainer.getClientRects?.()[0] || {}
    if (width) {
      asyncSetItemConfig({ scale: width / SVG_SIZE })
    }
  }, [svgContainer.clientWidth])

  const setBgColor = (bgColor) => asyncSetItemConfig({ bgColor })
  const setTextColor = (textColor) => asyncSetItemConfig({ textColor })
  const memoizedRef = useCallback(
    (node) => setSvgContainer((prevNode) => node || prevNode),
    [isModalOpen]
  )

  return (
    <>
      <FloatingActionButton onClick={openModal} />
      <Modal disabled={isLoading} isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex space-x-2 px-4 my-2" role="title">
          <strong>GENESIS</strong>
          <div className="flex-grow" />
          <SizeLeftCounter size={itemConfig.message.length} />
        </div>
        <div ref={memoizedRef} className="relative border">
          <SvgDebugger>
            <SvgContent {...itemConfig} />
          </SvgDebugger>
          {isModalOpen && (
            <VerticalTextArea
              disabled={isLoading}
              svgRenderSize={svgContainer.clientWidth}
              onText={handleItemMessage}
              itemConfig={itemConfig}
            />
          )}
        </div>
        <div className="flex items-ceneter justify-between space-x-2">
          <ColorPicker
            disabled={isLoading}
            value={itemConfig.bgColor}
            onColor={setBgColor}
          >
            <MdOutlineFormatColorFill className="text-xl" />
          </ColorPicker>
          <ColorPicker
            disabled={isLoading}
            value={itemConfig.textColor}
            onColor={setTextColor}
          >
            <MdFormatColorText className="text-xl" />
          </ColorPicker>
          <div className="flex-grow" />
          <button
            type="button"
            disabled={isLoading}
            className="flex items-center gap-3 font-bold text-xl py-3 px-4 hover:bg-slate-100"
            onClick={handleCreate}
          >
            CREATE <HiArrowRight />
          </button>
        </div>
      </Modal>
    </>
  )
}

const IS_PROD = !isDevEnv()
const SvgDebugger = ({ children }) => {
  const [state] = useState({ showTraces: false })
  const { showTraces } = state
  // No debugger in prod
  if (IS_PROD) return children
  return (
    <div className="relative">
      <div
        className="pointer-events-none"
        style={{ opacity: showTraces ? 0.5 : 0 }}
      >
        {children}
      </div>
      {showTraces && (
        <div
          style={{ height: 1, top: "50%", zIndex: 1 }}
          className="absolute bg-red-700 w-full"
        />
      )}
    </div>
  )
}

export default CreateButton
