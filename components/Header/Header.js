import { Fragment } from "react"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import { ConnectButton } from "@rainbow-me/rainbowkit"

function Header() {
  return (
    <Fragment>
      <Head>
        <title>Jeshejojo</title>
        <meta
          name="description"
          content="Instagram-ish like DApp to share your top level dad jokes 🦔"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
