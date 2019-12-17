import { ObjectSchema } from 'yup'
import { FormikActions, FieldProps } from 'formik'
import { FaceDetection, WithFaceExpressions, FaceExpressions } from 'face-api.js'

// DYNAMIC FORM TYPES
export interface DynamicFormProps {
  failMessage: string
  formInput: Array<DynamicFormInputObject>
  formInitialValues: Array<InitialValues>
  onSubmit: (arg0: OnSubmitObject, arg1: FormikActions<OnSubmitObject>) => void
  submitType: string
  successMessage: string
  validationSchema: ObjectSchema
  formSelect?: Array<DynamicFormSelectObject>
}

export interface InitialValues {
  name: string
  value: any
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
  successMessage?: string
  failMessage: string
  setStatus: (arg: ModalStatus) => void
}

export interface ModalStatus {
  success?: boolean
  openModal: boolean
}

export interface CheckboxSchemaObj {
  environment: boolean
  animalWelfare: boolean
  personalHealth: boolean
  foodSecurity: boolean
}

export interface FaceRecogProperties {
  detection: FaceDetection
  expressions: FaceExpressions
}

export interface GroupPostImageSuccess {
  id: string
  post_id: string
}

export interface GroupPostImageFailure {
  error: GroupPostErrorObject
}

interface GroupPostErrorObject {
  message: string
  type: string
  code: number
  error_subcode: number
  fbtrace_id: number
}

export type SuccessOrFailure = GroupPostImageSuccess | GroupPostImageFailure

