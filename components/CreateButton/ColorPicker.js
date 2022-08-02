import { useEffect, useState } from "react"

const ColorPicker = ({
  onColor = () => null,
  value,
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
      className="text-sm relative group inline-flex space-x-1 items-center justify-between hover:bg-zinc-100 py-1 px-2 rounded-lg"
    >
      <div
        className="w-6 h-6 rounded-full border"
        style={{ background: color }}
      />
      <strong>{children}</strong>
      <input
        type="color"
        onInput={handleOnInput}
        className="inset-0 absolute opacity-0 w-full h-full"
      />
    </label>
  )
}

export default ColorPicker
