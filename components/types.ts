import { ObjectSchema } from 'yup'
import { FormikActions, FieldProps } from 'formik'

export interface DynamicFormProps {
  formInput: Array<DynamicFormInputObject>
  validationSchema: ObjectSchema
  onSubmit: (arg0: OnSubmitObject, arg1: FormikActions<OnSubmitObject>) => void
  submitType: string
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