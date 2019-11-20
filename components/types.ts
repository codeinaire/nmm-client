import { ObjectSchema } from 'yup'
import { FormikActions, FieldProps } from 'formik'
import { MouseEvent, KeyboardEvent, ReactElement } from 'react'
// DYNAMIC FORM TYPES
export interface DynamicFormProps {
  failMessage?: string
  formInput: Array<DynamicFormInputObject>
  onSubmit: (arg0: OnSubmitObject, arg1: FormikActions<OnSubmitObject>) => void
  submitType: string
  successMessage?: string
  validationSchema: ObjectSchema
  formSelect?: Array<DynamicFormSelectObject>
  formInitialValues?: Array<string>
}

export interface OnSubmitObject {
  [key: string]: string
}

export interface DynamicFormInputObject {
  type: string
  name: string
  errorMessageId: string
  required: boolean
  autocomplete: string
  displayName: string
  textArea?: boolean
}

export interface DynamicFormSelectObject {
  name: string
  errorMessageId: string
  options: Array<SelectOption>
}

export interface SelectOption {
  value: string
  displayName: string
}

export interface FileUploadProps extends FieldProps {
  'aria-errormessage': string
  'aria-invalid': boolean
  'aria-required': boolean
  autoComplete: string
  children: undefined | string
  'data-testid': string
  id: string
  type: string
}

// MODAL TYPES
export interface ModalContentProps {
  modalRef: (arg0: any) => void
  buttonRef: (arg0: any) => void
  closeModal: () => void
  content: ReactElement
  onKeyDown: (arg0: KeyboardEvent<HTMLInputElement>) => void
  onClickOutside: (arg0: MouseEvent<HTMLInputElement>) =>  void
}

export interface ModalTriggerProps {
  showModal: () => void
  buttonRef: (arg0: any) => void
  triggerText: string
}

export interface ModalProps {
  trigggerText: string
}

export type ModalContentType = ReactElement