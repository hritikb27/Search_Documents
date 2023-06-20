import { Fragment, useState, useReducer } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import TextareaAutosize from 'react-textarea-autosize';
import { addItem } from '../../hooks/mutations';
import { useMutation } from 'react-query';
import { DynamicFieldsInterface, FormAction, FormState, UploadFormProps } from '../../interfaces/UploadModalInterface';
import { v4 } from 'uuid'

// initial state
const initialState: FormState = {
    name: '',
    content: '',
};

// Reducer function
const formReducer = (state: FormState = initialState, action: FormAction): FormState => {
    switch (action.type) {
        case 'UPDATE_NAME':
            return { ...state, name: action.payload };
        case 'UPDATE_CONTENT':
            return { ...state, content: action.payload };
        case 'RESET':
            return action.payload;
        default:
            return state;
    }
};

export default function FormModal({ open, setOpen }: UploadFormProps) {
    const [loading, setLoading] = useState(false)
    const [state, dispatchForm] = useReducer(formReducer, initialState);
    const [dynamicFields, setDynamicFields] = useState<DynamicFieldsInterface[]>([])

    // mutation hook for adding item to database
    const { mutate, isLoading } = useMutation(addItem, {
        onSuccess: data => {
            console.log(data);
            dispatchForm({ type: 'RESET', payload: initialState })
            setOpen(false)
            setLoading(false)
        },
        onError: () => {
            console.log("there was an error")
            setLoading(false)
        }
    });

    // handle form submit
    const handleSubmit = async () => {
        let updateFormState = { ...state }
        dynamicFields.forEach(item => {
            updateFormState[item.key] = item.value
        })
        dispatchForm({ type: 'RESET', payload: updateFormState })
        console.log(updateFormState)
        setLoading(true)
        mutate(updateFormState)
    }

    // handle adding dynamic fields
    const handleDynamicFields = () => {
        setDynamicFields(prevArray => [...prevArray, { key: '', value: '', id: v4() }])
    }

    // handle changing dynamic fields' data
    const handleDynamicFieldChange = (e: React.ChangeEvent<HTMLInputElement>, type: string, id: string) => {
        setDynamicFields(prevArray => {
            return prevArray.map(item => {
                if (item.id === id) {
                    return { ...item, [type]: e.target.value }
                }
                return item
            })
        })
    }

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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                                <div>
                                    <div className="mt-3 text-center sm:mt-1">
                                        <div className="mt-2">
                                            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                                                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                                    <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                                        Add Document
                                                    </h2>
                                                </div>

                                                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                                    <form className="space-y-6" action="#" method="POST">
                                                        <div className="flex items-center gap-4 sm:gap-0 justify-between">
                                                            <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Name
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    id="name"
                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatchForm({ type: 'UPDATE_NAME', payload: e.target.value })}
                                                                    name="name"
                                                                    value={state.name}
                                                                    type="text"
                                                                    autoComplete="name"
                                                                    required
                                                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-black bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="flex flex-col items-start gap-4 sm:gap-0 justify-between">
                                                            <div className="flex items-center justify-between">
                                                                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Content
                                                                </label>
                                                            </div>
                                                            <div className="w-full mt-2">
                                                                <TextareaAutosize value={state.content} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { dispatchForm({ type: 'UPDATE_CONTENT', payload: e.target.value }) }} className="py-1.5 px-2 rounded-md w-full bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 text-black border-transparent focus:border-transparent focus:ring-0" minRows={4} maxRows={8} style={{ resize: "none" }} />
                                                            </div>
                                                        </div>
                                                        {dynamicFields && dynamicFields.length > 0 && <div className='flex flex-col gap-5 h-[200px] px-1 py-2 overflow-y-auto'>
                                                            {dynamicFields.map((field, index) => {
                                                                return <div className='flex flex-col gap-5'>
                                                                    <input type={'text'} value={field.key} placeholder='key' onChange={(e) => handleDynamicFieldChange(e, 'key', field.id)} className='py-1.5 px-2 w-[60%] rounded-md bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 text-black border-transparent focus:border-transparent focus:ring-0' />
                                                                    <input type={'text'} value={field.value} placeholder='value' onChange={(e) => handleDynamicFieldChange(e, 'value', field.id)} className='py-1.5 px-2 rounded-md bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 text-black border-transparent focus:border-transparent focus:ring-0' />
                                                                    <TrashIcon color='black' fontSize={'20px'} className='cursor-pointer text-sm w-8 h-8' onClick={() => setDynamicFields(prev => prev.filter(item => item.id !== field.id))} />
                                                                </div>
                                                            })}
                                                        </div>}
                                                        <div onClick={handleDynamicFields} className='w-full border rounded cursor-pointer flex justify-center'>
                                                            <PlusIcon color='black' fontSize={'20px'} className='text-sm w-8 h-8' />
                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-5 sm:mt-6">
                                        {!loading ? <button
                                            type="button"
                                            className="inline-flex w-[60%] sm:w-[40%] mx-auto justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={handleSubmit}
                                        >
                                            Save Document
                                        </button> :
                                            <button type="button" className="text-white flex items-center justify-between p-2 w-[40%] mx-auto bg-indigo-500" disabled>
                                                <div
                                                    className="inline-block h-8 w-8 text-white animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                                    role="status">
                                                    <span
                                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                                    >Loading...</span>
                                                </div>
                                                Processing...
                                            </button>}
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
