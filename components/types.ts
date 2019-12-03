import { ObjectSchema } from 'yup'
import { FormikActions, FieldProps } from 'formik'

// DYNAMIC FORM TYPES
export interface DynamicFormProps {
  failMessage: string
  formInput: Array<DynamicFormInputObject>
  onSubmit: (arg0: OnSubmitObject, arg1: FormikActions<OnSubmitObject>) => void
  submitType: string
  successMessage: string
  validationSchema: ObjectSchema
  formSelect?: Array<DynamicFormSelectObject>
  formInitialValues?: Array<string>
}

export interface OnSubmitObject {
  [key: string]: string
}

export interface DynamicFormInputObject {
  type?: string
  name: string
  errorMessageId?: string
  required?: boolean
  autocomplete?: string
  displayName?: string
  checkboxInput?: Array<DynamicFormCheckboxInputObject>
  legend?: string
  checkbox?: boolean
  disabled?: boolean
  hintText?: string
  textArea?: boolean
}

interface DynamicFormCheckboxInputObject {
  type: string
  name: string
  errorMessageId: string
  required: boolean
  autocomplete: string
  displayName: string
}

export interface DynamicFormSelectObject {
  name: string
  errorMessageId: string
  options: Array<SelectOption>
  title?: string
}

export interface SelectOption {
  value: string | number
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
export interface ModalProps {
  status: ModalStatus
  successMessage: string
  failMessage: string
  setStatus: (arg: ModalStatus) => void
}

export interface ModalStatus {
  success?: boolean
  openModal: boolean
}
