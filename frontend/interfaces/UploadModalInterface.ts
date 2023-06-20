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

// Define the action types
export type FormAction =
    | { type: 'UPDATE_NAME'; payload: string }
    | { type: 'UPDATE_CONTENT'; payload: string }
    | { type: 'RESET'; payload: FormState }