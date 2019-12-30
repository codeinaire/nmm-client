import React from 'react'
import { Formik, Field, FieldArray } from 'formik'
import Modal from './DynamicFormModal'
import DynamicFormCheckbox from './DynamicFormCheckbox'
import DynamicFormSelect from './DynamicFormSelect'
import DynamicFormInput from './DynamicFormInput'

import {
  DynamicFormProps,
  DynamicFormInputObject,
  InitialValues
} from './types'

// TODO - STYLING
// TODO - placeholder for inputs explaining pw conditions
export default function DynamicForm(props: DynamicFormProps) {
  const {
    failMessage,
    formInput,
    formInitialValues,
    onSubmit,
    successMessage,
    submitType,
    validationSchema,
    formSelect = []
  } = props

  return (
    <>
      <Formik
        initialValues={formInitialValues.reduce(
          (acc: object, cur: InitialValues) => {
            return Object.assign(acc, {
              [cur.name]: cur.value
            })
          },
          {}
        )}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          errors,
          touched,
          handleReset,
          handleSubmit,
          status,
          setStatus
        }) => (
          <>
            <Modal
              failMessage={failMessage}
              successMessage={successMessage}
              status={status}
              setStatus={setStatus}
            />
            <form onReset={handleReset} onSubmit={handleSubmit} method='POST'>
              {formInput.map((inputItem: DynamicFormInputObject) => (
                <React.Fragment key={inputItem.name}>
                  {inputItem.checkbox ? (
                    <DynamicFormCheckbox
                      errors={errors}
                      inputItem={inputItem}
                      touched={touched}
                    />
                  ) : (
                    <DynamicFormInput
                      inputItem={inputItem}
                      errors={errors}
                      touched={touched}
                    />
                  )}
                  {inputItem.hintText ? (
                    <span>
                      <p>
                        <i>{inputItem.hintText}</i>
                      </p>
                    </span>
                  ) : null}
                  <br />
                </React.Fragment>
              ))}
              {formSelect.length ? (
                <DynamicFormSelect
                  formSelect={formSelect}
                  errors={errors}
                  touched={touched}
                />
              ) : null}
              <br />
              <button data-testid='submit' type='submit'>
                {submitType}
              </button>
            </form>
          </>
        )}
      </Formik>
    </>
  )
}
