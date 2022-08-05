import { useEffect, useState } from "react"
import { noOp } from "@/lib/helpers"

const ColorPicker = ({
  onColor = noOp,
  value,
  disabled,
  defaultColor = "#ffffff",
  children = null,
}) => {
  const [color, setColor] = useState(value || defaultColor)

  useEffect(() => {
    if (value) setColor(value)
  }, [value])

  function handleOnInput(e) {
    const { value: color } = e.target
    setColor(color)
    onColor(color)
  }
  return (
    <label
      role="button"
      className="text-sm relative group inline-flex space-x-1 items-center justify-between hover:bg-zinc-100 py-1 px-2"
    >
      <div
        className="w-5 h-5 rounded-full border"
        style={{ background: color }}
      />
      {children}
      <input
        value={color}
        type="color"
        disabled={disabled}
        onInput={handleOnInput}
        className="inset-0 z-[1] cursor-pointer absolute opacity-0 w-full h-full"
      />
    </label>
  )
}

export default ColorPicker
