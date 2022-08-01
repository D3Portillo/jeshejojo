/**
 * Animated pulse block item.
 * NOTE: You must add tailwind w- h- className
 * @param { Object } props
 * @param { string } props.className
 */
const MockBlock = ({ className }) => (
  <div className={`bg-zinc-100 rounded-lg animate-pulse ${className}`} />
)

export default MockBlock
