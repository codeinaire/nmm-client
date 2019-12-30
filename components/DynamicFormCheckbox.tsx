import React from 'react'
import { Field, FormikErrors, FormikTouched } from 'formik'
import { DynamicFormInputObject } from './types'

export default ({
  errors,
  inputItem,
  touched
}: {
  errors: FormikErrors<DynamicFormInputObject>
  inputItem: DynamicFormInputObject
  touched: FormikTouched<DynamicFormInputObject>
}) => {
  return (
    <fieldset name={inputItem.name}>
      <legend>{inputItem.legend}</legend>
      {inputItem.checkboxInput!.map((checkboxItem: DynamicFormInputObject) => (
        <React.Fragment key={checkboxItem.name}>
          {errors[checkboxItem.name] && touched[checkboxItem.name] ? (
            <div
              id={checkboxItem.errorMessageId}
              data-testid={checkboxItem.errorMessageId}
            >
              {errors[checkboxItem.name]}
            </div>
          ) : null}
          <label htmlFor={checkboxItem.name}>
            <b>{checkboxItem.displayName}</b>:{' '}
            <Field
              aria-errormessage={checkboxItem.errorMessageId}
              aria-invalid={!!errors[checkboxItem.name]}
              aria-required={checkboxItem.required}
              autoComplete={checkboxItem.autocomplete}
              data-testid={checkboxItem.name}
              disabled={checkboxItem.disabled}
              id={checkboxItem.name}
              name={checkboxItem.name}
              type={checkboxItem.type}
            />
          </label>
        </React.Fragment>
      ))}
    </fieldset>
  )
}
