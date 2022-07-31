function sanitizeText(text = "") {
  return text.replace(/\n{1,}/g, "\n")
}

export default sanitizeText
