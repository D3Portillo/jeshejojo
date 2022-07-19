import Head from "next/head"
import { ConnectButton } from "@rainbow-me/rainbowkit"
export default function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Head>
        <title>Sonic el jeshejojo</title>
        <meta
          name="description"
          content="DApp to share your top level dad jokes 🦔."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-end p-4">
        <ConnectButton />
      </header>
      <main className="flex flex-grow items-center justify-center">
        <div className="text-white text-5xl">
          <strong>HOLA 👋</strong>
        </div>
      </main>
    </div>
  )
}
