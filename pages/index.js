import Head from "next/head"
import Image from "next/image"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import CreateButton from "@/components/CreateButton"
import Feed from "@/components/Feed"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Jeshejojo</title>
        <meta
          name="description"
          content="Instagram-ish like DApp to share your top level dad jokes 🦔"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-between p-4">
        <div className="flex items-center">
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
        </div>
        <ConnectButton />
      </header>
      <Feed />
      <CreateButton />
      <Footer />
    </div>
  )
}
