const formatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
})

function prettyNumber(n = 0) {
  return formatter.format(n)
}

export default prettyNumber
