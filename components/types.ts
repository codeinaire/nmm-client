import { ObjectSchema } from 'yup';
import { FormikActions } from 'formik';

export interface DynamicFormProps {
  formTest: Array<DynamicFormObject>;
  validationSchema: ObjectSchema;
  onSubmit: (arg0: OnSubmitObject, arg1: FormikActions<OnSubmitObject>) => void;
  submitType: string;
}

export interface OnSubmitObject {
  [key: string]: string
}

export interface DynamicFormObject {
  type: string;
  name: string;
  errorMessageId: string;
  required: string;
  autocomplete: string;
  displayName: string;
}