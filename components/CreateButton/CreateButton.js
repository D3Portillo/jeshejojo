import { Fragment, useEffect, useRef, useState } from "react"
import { Dialog, Transition, Tab } from "@headlessui/react"
import SvgContent, { SIZE as SVG_SIZE, GAP as SVG_GAP } from "../SvgContent"
import getContract from "@/lib/getContract"
import { useContractRead, useContractWrite, useNetwork } from "wagmi"
import { ethers } from "ethers"
import sanitizeText from "@/lib/sanitizeText"
import { HiArrowRight } from "react-icons/hi"
import { GrAdd, GrFormAdd } from "react-icons/gr"

const ColorPicker = ({
  onColor,
  value,
  defaultColor = "#ffffff",
  children = null,
}) => {
  const [color, setColor] = useState(value || defaultColor)

  useEffect(() => {
    onColor(color)
  }, [color])

  return (
    <label
      role="button"
      className="text-sm relative group inline-flex space-x-1 items-center justify-between hover:bg-zinc-100 py-1 px-2 rounded-lg"
    >
      <div
        className="w-6 h-6 rounded-full border"
        style={{ background: color }}
      />
      <strong>{children}</strong>
      <input
        type="color"
        onInput={(e) => setColor(e.target.value)}
        className="inset-0 absolute opacity-0 w-full h-full"
      />
    </label>
  )
}

const SvgDebugger = ({ children }) => {
  const [state] = useState({ showTraces: false })
  const { showTraces } = state
  return (
    <Fragment>
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
    </Fragment>
  )
}

function SizeLeft({ size = 0, maxSize = 200 }) {
  const left = maxSize - size
  return (
    <div className="text-zinc-400 flex items-center gap-1">
      Left:
      <span
        className={
          left < 10
            ? "text-red-400 font-bold"
            : left < 30
            ? "text-orange-300 font-bold"
            : ""
        }
      >
        {left}
      </span>
    </div>
  )
}

function VerticalTextArea({ onText, itemConfig = {}, scale = 1 }) {
  return (
    <label
      style={{
        background: itemConfig.bgColor,
      }}
      className="absolute overflow-hidden flex items-center inset-0 w-full"
    >
      {itemConfig.message ? null : (
        <div
          style={{
            fontSize: scale * itemConfig.textSize,
            lineHeight: "115%",
            color: itemConfig.textColor,
          }}
          className="absolute inset-0 flex items-center text-center opacity-50"
          role="placeholder"
        >
          Drop your best line...
        </div>
      )}
      <textarea
        id="texto"
        className="bg-transparent w-full text-center overflow-hidden"
        value={itemConfig.message}
        style={{
          lineHeight: "115%",
          color: itemConfig.textColor,
          padding: `50% ${scale * SVG_GAP}px`,
          fontSize: scale * itemConfig.textSize,
        }}
        onInput={(e) => {
          e.target.style.height = scale * itemConfig.textSize + "px"
          e.target.style.height = e.target.scrollHeight + "px"
          onText(e.target.value)
        }}
      />
    </label>
  )
}

const MeinJokes = getContract("MeinJokes")

function CreateButton() {
  const svgContainerRef = useRef()
  const [textAreaFontRatio, setTextAreaFontRatio] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [itemConfig, setItemConfig] = useState({
    bgColor: "#ffffff",
    textColor: "#000000",
    message: "",
    textSize: 120,
  })
  const { data, isError, isLoading, write } = useContractWrite({
    addressOrName: MeinJokes.address,
    contractInterface: MeinJokes.abi,
    functionName: "listItem",
  })
  /** @type { MeinJokes["listItem"] } */
  const listItem = (...args) => write({ args })
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function handleCreate() {
    const { message, bgColor, textColor } = itemConfig
    listItem(
      message,
      ethers.utils.toUtf8Bytes(bgColor.replace("#", "")),
      ethers.utils.toUtf8Bytes(textColor.replace("#", ""))
    )
  }

  const handleMessage = (rawMessage = "") => {
    const message = sanitizeText(rawMessage)
    setItemConfig((config) => ({
      ...config,
      message,
      textSize: message.length < 80 ? 120 : 80,
    }))
  }

  useEffect(() => {
    /** @type { HTMLDivElement } */
    const container = svgContainerRef.current
    if (container) {
      const rects = container.getClientRects()[0] || {}
      const { width: size = 1 } = rects
      const ratio = size / SVG_SIZE
      setTextAreaFontRatio(ratio)
    }
  }, [itemConfig, isOpen])

  const setBgColor = (bgColor) =>
    setItemConfig((state) => ({ ...state, bgColor }))
  const setTextColor = (textColor) =>
    setItemConfig((state) => ({ ...state, textColor }))
  return (
    <>
      <div className="fixed bottom-0 right-0 w-full">
        <div className="max-w-4xl relative mx-auto">
          <div className="absolute bottom-0 right-0 p-4">
            <button
              onClick={openModal}
              className="bg-white shadow-2xl drop-shadow-xl w-20 h-20 font-bold flex items-center justify-center rounded-full"
            >
              <GrFormAdd className="text-4xl" />
            </button>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="section"
          role="dialog"
          className="relative z-10"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end lg:items-start justify-center lg:p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-t-2xl lg:rounded-b-2xl bg-white shadow-xl transition-all">
                  <div
                    className="flex space-x-2 pl-2 pr-4 my-2"
                    role="controls"
                  >
                    <ColorPicker
                      value={itemConfig.bgColor}
                      onColor={setBgColor}
                    >
                      Background
                    </ColorPicker>
                    <ColorPicker
                      value={itemConfig.textColor}
                      onColor={setTextColor}
                    >
                      Text
                    </ColorPicker>
                    <div className="flex-grow"></div>
                    <SizeLeft size={itemConfig.message.length} />
                  </div>
                  <div ref={svgContainerRef} className="relative border">
                    <SvgDebugger>
                      <SvgContent {...itemConfig} />
                    </SvgDebugger>
                    <VerticalTextArea
                      scale={textAreaFontRatio}
                      onText={handleMessage}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default CreateButton
