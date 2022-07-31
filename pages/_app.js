import DappProvider from "@/components/DappProvider"
import "@/assets/styles.css"

function DApp({ Component, pageProps }) {
  return (
    <DappProvider>
      <Component {...pageProps} />
    </DappProvider>
  )
}

export default DApp
