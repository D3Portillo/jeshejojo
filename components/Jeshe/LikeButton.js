import classnames from "@/lib/classnames"

function LikeButton({ isMock, children = null, onClick, isActive = false }) {
  return (
    <button
      onClick={onClick}
      disabled={isMock}
      className={classnames(
        "hover:bg-zinc-100 py-1 px-2 rounded-lg active:scale-105 ring-slate-200 focus:ring-2",
        isActive && "bg-zinc-100",
        isMock && "opacity-75 animate-pulse"
      )}
    >
      {children}
    </button>
  )
}

export default LikeButton
