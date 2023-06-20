export interface DynamicFieldsInterface {
    id: string;
    key: string;
    value: string;
}

// Define the state type
export interface FormState {
    name: string;
    content: string;
}

export interface UploadFormProps {
    open: boolean
    setOpen: (open: boolean) => void
}