import { useCallback, useEffect, useState } from "react"
import { useContractWrite } from "wagmi"
import { utils } from "ethers"
import { HiArrowRight } from "react-icons/hi"
import { GrFormAdd } from "react-icons/gr"

import getContract from "@/lib/getContract"
import sanitizeText from "@/lib/sanitizeText"
import { isDevEnv } from "@/lib/helpers"

import SvgContent, {
  getContentTextSize,
  SIZE as SVG_SIZE,
} from "@/components/SvgContent"
import Modal from "@/components/Modal"
import ColorPicker from "./ColorPicker"
import SizeLeftCounter from "./SizeLeftCounter"
import VerticalTextArea from "./VerticalTextArea"

const MeinJokes = getContract("MeinJokes")
const INIT_ITEM_STATE = {
  bgColor: "#ffffff",
  textColor: "#000000",
  message: "",
  textSize: 120,
}
/** @type { HTMLDivElement } */
const MOCK_DIV = {}
function CreateButton() {
  const [svgScale, setSvgScale] = useState(1)
  const [svgContainer, setSvgContainer] = useState(MOCK_DIV)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemConfig, setItemConfig] = useState(INIT_ITEM_STATE)
  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: MeinJokes.address,
    contractInterface: MeinJokes.abi,
    functionName: "listItem",
  })
  /** @type { MeinJokes["listItem"] } */
  const listItem = (...args) => write({ args })

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
    listItem(
      message,
      utils.toUtf8Bytes(bgColor.replace("#", "")),
      utils.toUtf8Bytes(textColor.replace("#", ""))
    )
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
      setSvgScale(width / SVG_SIZE)
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
      <section className="sticky bottom-0 mx-auto w-screen max-w-4xl">
        <div className="absolute bottom-0 right-0 p-4">
          <button
            onClick={openModal}
            className="bg-white shadow-2xl drop-shadow-xl w-20 h-20 font-bold flex items-center justify-center rounded-full"
          >
            <GrFormAdd className="text-4xl" />
          </button>
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex space-x-2 pl-2 pr-4 my-2" role="controls">
          <ColorPicker value={itemConfig.bgColor} onColor={setBgColor}>
            Background
          </ColorPicker>
          <ColorPicker value={itemConfig.textColor} onColor={setTextColor}>
            Text
          </ColorPicker>
          <div className="flex-grow" />
          <SizeLeftCounter size={itemConfig.message.length} />
        </div>
        <div ref={memoizedRef} className="relative border">
          <SvgDebugger>
            <SvgContent {...itemConfig} />
          </SvgDebugger>
          <VerticalTextArea
            svgRenderSize={svgContainer.clientWidth}
            scale={svgScale}
            onText={handleItemMessage}
            itemConfig={itemConfig}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
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
