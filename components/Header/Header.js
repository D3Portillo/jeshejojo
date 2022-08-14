import { Fragment } from "react"
import Image from "next/image"
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

function Header() {
  return (
    <Fragment>
      <header className="flex justify-between p-4">
        <Link href="/">
          <a className="flex items-center">
            <div className="w-10 h-10">
              <Image
                alt="Website logo: It's a customized sonic image. The name comes from a youtube video with the title: 'Sonic el jeshejojo'"
                src="/logo.png"
                width={400}
                height={400}
                layout="responsive"
              />
            </div>
            <strong className="hidden sm:block">Jeshejojo</strong>
          </a>
        </Link>
        <ConnectButton />
      </header>
    </Fragment>
  )
}

export default Header
