import { ObjectSchema } from 'yup'
import { FormikActions } from 'formik'

export interface DynamicFormProps {
  formInput: Array<DynamicFormInputObject>
  validationSchema: ObjectSchema
  onSubmit: (arg0: OnSubmitObject, arg1: FormikActions<OnSubmitObject>) => void
  submitType: string
  formSelect?: Array<DynamicFormSelectObject>
  formInitialValues?: Array<string>
  useState?: boolean
}

export interface OnSubmitObject {
  [key: string]: string
}

export interface DynamicFormInputObject {
  type: string
  name: string
  errorMessageId: string
  required: string
  autocomplete: string
  displayName: string
  textArea?: boolean
}

export interface DynamicFormSelectObject {
  name: string
  options: Array<SelectOption>
}

export interface SelectOption {
  value: string
  displayName: string
}