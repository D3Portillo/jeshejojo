function ErrorMessage({ onActionPressed }) {
  return (
    <div className="flex absolute inset-0 bg-white items-center justify-center">
      <div className="p-4 text-center max-w-sm">
        <p>
          An error ocurred while creating this item. See TX if available, Sorry
          :(
        </p>
        <button
          className="underline decoration-wavy text-blue-400 hover:text-blue-500"
          onClick={onActionPressed}
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default ErrorMessage
