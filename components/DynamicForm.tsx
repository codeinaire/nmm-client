import React from 'react';
import { Formik, Field } from 'formik';
import MediaUpload from './FileUpload';

import {
  DynamicFormProps,
  DynamicFormInputObject,
  DynamicFormSelectObject,
  SelectOption
} from './types';

// TODO - STYLING
// TODO - placeholder for inputs explaining pw conditions
export default function DynamicForm(props: DynamicFormProps) {
  const {
    formInput,
    validationSchema,
    onSubmit,
    submitType,
    formSelect = [],
    formInitialValues = []
  } = props;

  return (
    <>
      <Formik
        initialValues={
          formInitialValues.length
            ? formInitialValues.reduce((acc: object, name: string) => {
                return Object.assign(acc, {
                  [name]: ''
                });
              }, {})
            : formInput.reduce((acc: object, cur: any) => {
                return Object.assign(acc, {
                  [cur.name]: ''
                });
              }, {})
        }
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          errors,
          touched,
          handleReset,
          handleSubmit,
          // handleChange
          // handleBlur,
          // setValues,
          // values
        }) => (
          <form onReset={handleReset} onSubmit={handleSubmit} method='POST'>
            {formInput.map((inputItem: DynamicFormInputObject) => (
              <React.Fragment key={inputItem.name}>
                <label htmlFor={inputItem.name}>
                  {inputItem.displayName}: {' '}
                </label>
                <Field
                  aria-errormessage={inputItem.errorMessageId}
                  aria-invalid={!!errors[inputItem.name]}
                  aria-required={inputItem.required}
                  autoComplete={inputItem.autocomplete}
                  component={inputItem.textArea ? 'textarea' : inputItem.name == 'photo' ? MediaUpload : 'input' }
                  data-testid={inputItem.name}
                  id={inputItem.name}
                  name={inputItem.name}
                  type={inputItem.type}
                />
                {errors[inputItem.name] && touched[inputItem.name] ? (
                  <div
                    id={inputItem.errorMessageId}
                    data-testid={inputItem.errorMessageId}
                  >
                    {errors[inputItem.name]}
                  </div>
                ) : null}
                <br />
              </React.Fragment>
            ))}
            {formSelect.length
              ? formSelect.map((selectItem: DynamicFormSelectObject) => (
                  <React.Fragment key={selectItem.name}>
                    <br />
                    <Field
                      component='select'
                      name={selectItem.name}
                      id={`${selectItem.name}-select`}
                      key={selectItem.name}
                    >
                      {selectItem.options.map((selectOption: SelectOption) => (
                        <option
                          value={selectOption.value}
                          key={selectOption.value}
                        >
                          {selectOption.displayName}
                        </option>
                      ))}
                    </Field>
                    <br />
                  </React.Fragment>
                ))
              : null}
            <br />
            <button data-testid='submit' type='submit'>
              {submitType}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}
