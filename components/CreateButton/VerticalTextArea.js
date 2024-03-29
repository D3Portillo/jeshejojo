import { GAP } from "@/components/SvgContent"

function VerticalTextArea({
  onText,
  svgRenderSize = 1,
  disabled,
  itemConfig = {},
}) {
  const { bgColor, textColor, message, textSize, scale } = itemConfig
  const scaledFontSize = scale * textSize
  return (
    <label
      style={{
        background: bgColor,
      }}
      className="absolute overflow-hidden flex items-center inset-0 w-full"
    >
      {message ? null : (
        <div
          style={{
            fontSize: scale * textSize,
            lineHeight: "115%",
            color: textColor,
          }}
          className="absolute inset-0 flex items-center justify-center text-center opacity-50 pointer-events-none"
          role="placeholder"
        >
          Drop a signal..
        </div>
      )}
      <textarea
        autoFocus
        disabled={disabled}
        className="bg-transparent outline-none w-full text-center overflow-hidden"
        value={message}
        style={{
          lineHeight: "115%",
          maxHeight: message ? "none" : svgRenderSize + scaledFontSize * 1.15,
          color: textColor,
          padding: `50% ${scale * GAP}px`,
          fontSize: scaledFontSize,
        }}
        spellCheck={false}
        onInput={({ target }) => {
          target.style.height = scaledFontSize + "px"
          target.style.height = target.scrollHeight + "px"
          onText(target.value)
        }}
      />
    </label>
  )
}

export default VerticalTextArea
