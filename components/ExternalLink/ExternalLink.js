import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"
import classnames from "@/lib/classnames"

function ExternalLink({ href = "", children = null, className }) {
  return (
    <Link href={href}>
      <a
        className={classnames(
          "text-sm group inline-flex space-x-1 items-center hover:bg-zinc-100 active:scale-105 py-1 px-2 rounded-lg",
          "focus:ring-2 ring-slate-100",
          className
        )}
        target="_blank"
      >
        <span>{children}</span>
        <FiArrowUpRight className="group-hover:scale-110" />
      </a>
    </Link>
  )
}

export default ExternalLink
