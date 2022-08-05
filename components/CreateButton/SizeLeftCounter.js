function SizeLeftCounter({ size = 0, maxSize = 200 }) {
  const LEFT = maxSize - size
  return (
    <div className="text-zinc-400 flex items-center gap-1">
      <span
        className={[
          LEFT < 10 && "text-red-400 font-bold",
          LEFT < 30 && "text-orange-300 font-bold",
        ].find(Boolean)}
      >
        {LEFT}
      </span>
      LEFT
    </div>
  )
}

export default SizeLeftCounter
