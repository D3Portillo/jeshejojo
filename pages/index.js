import Head from "next/head"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sonic el jeshejojo</title>
        <meta
          name="description"
          content="DApp to share your top level dad jokes 🦔."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-5xl">
          <strong>HOLA 👋</strong>
        </div>
      </main>
    </div>
  )
}
