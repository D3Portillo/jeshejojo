import classnames from "@/lib/classnames"

function LikeButton({ children = null, onClick, isActive = false }) {
  return (
    <button
      onClick={onClick}
      className={classnames(
        "hover:bg-zinc-100 py-1 px-2 rounded-lg active:scale-105 ring-slate-200 focus:ring-2",
        isActive && "bg-zinc-100"
      )}
    >
      {children}
    </button>
  )
}

export default LikeButton
