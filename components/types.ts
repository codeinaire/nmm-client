import { ObjectSchema } from 'yup';

export interface DynamicFormProps {
  formTest: Array<DynamicFormObject>;
  validationSchema: ObjectSchema;
  onSubmit: (arg0: OnSubmitObject) => void;
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