import React from 'react'
import { Field, FormikErrors, FormikTouched } from 'formik'
import ImageUpload from './FileUpload'
import { DynamicFormInputObject } from './types'

export default ({
  inputItem,
  errors,
  touched
}: {
  inputItem: DynamicFormInputObject
  errors: FormikErrors<DynamicFormInputObject>
  touched: FormikTouched<DynamicFormInputObject>
}) => {
  return (
    <>
      <label htmlFor={inputItem.name}>
        <b>{inputItem.displayName}</b>:{' '}
        <Field
          aria-errormessage={inputItem.errorMessageId}
          aria-invalid={!!errors[inputItem.name]}
          aria-required={inputItem.required}
          autoComplete={inputItem.autocomplete}
          component={
            inputItem.textArea
              ? 'textarea'
              : inputItem.type == 'file'
              ? ImageUpload
              : 'input'
          }
          data-testid={inputItem.name}
          disabled={inputItem.disabled}
          id={inputItem.name}
          name={inputItem.name}
          type={inputItem.type}
        />
      </label>

      {errors[inputItem.name] && touched[inputItem.name] ? (
        <div
          id={inputItem.errorMessageId}
          data-testid={inputItem.errorMessageId}
        >
          {errors[inputItem.name]}
        </div>
      ) : null}
    </>
  )
}
