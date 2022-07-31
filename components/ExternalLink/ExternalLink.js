import Link from "next/link"
import { FiArrowUpRight } from "react-icons/fi"

function ExternalLink({ href = "", children = null }) {
  return (
    <Link href={href}>
      <a
        className="text-sm group inline-flex space-x-1 items-center hover:bg-zinc-100 py-1 px-2 rounded-lg"
        target="_blank"
      >
        <span>{children}</span>
        <FiArrowUpRight className="group-hover:scale-110" />
      </a>
    </Link>
  )
}

export default ExternalLink
