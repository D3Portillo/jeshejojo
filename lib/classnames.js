/**
 * classnames like helper
 * @example
 * classnames(true && "bg-white", false || "text-lg") // `bg-white text-lg`
 */
function classnames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default classnames
