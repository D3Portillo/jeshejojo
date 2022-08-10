import CreateButton from "@/components/CreateButton"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Feed from "@/components/Feed"

import useStatefullArray from "@/lib/hooks/useStatefullArray"

export default function Home() {
  const {
    items: userItems,
    pushItem,
    forceSetItems: clearUserItems,
  } = useStatefullArray()

  return (
    <div className="min-h-screen">
      <Header />
      <Feed
        clearUserCreatedItems={clearUserItems}
        userCreatedItems={userItems}
      />
      <CreateButton onCreateItem={pushItem} />
      <Footer />
    </div>
  )
}

