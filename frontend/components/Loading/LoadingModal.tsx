import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface LoadingModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function LoadingModal({ open, setOpen }: LoadingModalProps) {

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-transparent px-4 pb-4 pt-5 text-left transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <div className="mt-2">
                                            <button type="button" className="text-white flex items-center justify-end p-2 px-4 w-[25%] mx-auto " disabled>
                                                <div
                                                    className="inline-block h-5 sm:h-10 w-5 sm:w-10 text-white animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                    role="status">
                                                    <span
                                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                                    >Loading...</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>

                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
