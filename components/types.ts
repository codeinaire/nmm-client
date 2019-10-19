import { ObjectSchema } from 'yup';

export interface DynamicFormProps {
  formTest: Array<DynamicFormObject>;
  validationSchema: ObjectSchema;
  onSubmit: (arg0: OnSubmitObject) => void;
}

export interface OnSubmitObject {
  [key: string]: string
}

interface DynamicFormObject {
  type: string;
  name: string;
  errorMessageId: string;
  required: string;
  autocomplete: string;
  displayName: string;
}