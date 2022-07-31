import sanitizeText from "@/lib/sanitizeText"
export const SIZE = 1080
export const GAP = 8

const SvgContent = ({ text = "", bgColor = "white", textColor = "black" }) => {
  const sanitizedText = sanitizeText(text)
  const textSize = sanitizedText.length < 80 ? 120 : 80
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect fill={bgColor} width={SIZE} height={SIZE} />
        <foreignObject
          x={GAP}
          y={GAP}
          width={SIZE - GAP * 2}
          height={SIZE - GAP * 2}
        >
          <span
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: textSize,
              color: textColor,
              lineHeight: "115%",
              wordBreak: "break-word",
            }}
            dangerouslySetInnerHTML={{
              __html: sanitizedText.split(/\n{1,}/g).join("<br/>"),
            }}
            xmlns="http://www.w3.org/1999/xhtml"
          />
        </foreignObject>
      </g>
    </svg>
  )
}

export default SvgContent
