import { useRouter } from "next/router"

import getContract from "@/lib/getContract"
import { formatColor } from "@/components/Jeshe/internals"
import { FeedContainer } from "@/components/Feed/Feed"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Jeshe from "@/components/Jeshe"
import DefaultSeo from "@/components/DefaultSeo"

const MeinJokes = getContract("MeinJokes")
const BASE_URL = "https://jeshejojo.vercel.app"
export default function SingleItemId({ staticInfo }) {
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="min-h-screen">
      <Header />
      {staticInfo && (
        <DefaultSeo
          url={`${BASE_URL}/id/${id}`}
          seoURL={`${BASE_URL}/api/seo-image/${staticInfo.bgColor.replace(
            "#",
            ""
          )}`}
          title={`${id} | ${staticInfo.content}`}
          description={`Content: ${staticInfo.content}`}
        />
      )}
      <FeedContainer>{id && <Jeshe id={id} />}</FeedContainer>
      <Footer />
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { id } = params
  const item = await MeinJokes.getItemById(id)
  const staticInfo = {
    author: item.author,
    content: item.content,
    bgColor: formatColor(item.bgColor),
    textColor: formatColor(item.textColor),
  }
  return {
    props: { staticInfo },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "0" } },
      { params: { id: "1" } },
      { params: { id: "2" } },
    ],
    fallback: true,
  }
}
