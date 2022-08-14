import DappProvider from "@/components/DappProvider"
import { Toaster } from "react-hot-toast"

import DefaultSeo from "@/components/DefaultSeo"
import "@/assets/styles.css"

function DApp({ Component, pageProps }) {
  return (
    <DappProvider>
      <DefaultSeo />
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </DappProvider>
  )
}

export default DApp
