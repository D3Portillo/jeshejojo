import { Fragment, useMemo } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { noOp } from "@/lib/helpers"

function Modal({ children = null, disabled, onClose, isOpen = false }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="main"
        role="dialog"
        className="relative z-10"
        onClose={disabled ? noOp : onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end lg:items-start justify-center lg:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-t-2xl lg:rounded-b-2xl bg-white shadow-xl transition-all">
                <div className={disabled && "blur-[1.2px]"}>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
