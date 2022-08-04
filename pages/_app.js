import DappProvider from "@/components/DappProvider"
import { Toaster } from "react-hot-toast"
import "@/assets/styles.css"

function DApp({ Component, pageProps }) {
  return (
    <DappProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </DappProvider>
  )
}

export default DApp
