import { GrFormAdd } from "react-icons/gr"

function FloatingActionButton({ onClick }) {
  return (
    <section className="sticky bottom-0 mx-auto w-screen max-w-4xl">
      <div className="absolute bottom-0 right-0 p-4">
        <button
          onClick={onClick}
          className="bg-white shadow-2xl drop-shadow-xl w-20 h-20 font-bold flex items-center justify-center rounded-full"
        >
          <GrFormAdd className="text-4xl" />
        </button>
      </div>
    </section>
  )
}

export default FloatingActionButton
