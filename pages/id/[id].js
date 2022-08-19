import { useRouter } from "next/router"

import { FeedContainer } from "@/components/Feed/Feed"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Jeshe from "@/components/Jeshe"

export default function SingleItemId() {
  const router = useRouter()
  const { id } = router.query
  return (
    <div className="min-h-screen">
      <Header />
      <FeedContainer>{id && <Jeshe id={id} />}</FeedContainer>
      <Footer />
    </div>
  )
}
