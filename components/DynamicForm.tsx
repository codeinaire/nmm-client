import React from 'react'
import { Formik, Field, Form, FieldArray, FormikProps } from 'formik'
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
    formInput,
    formInitialValues,
    onSubmit,
    submitType,
    validationSchema,
    successMessage,
    failMessage,
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
        render={({ errors, status, setStatus, touched }: FormikProps<any>) => (
          <Form>
            <Modal
              failMessage={failMessage}
              successMessage={successMessage}
              status={status}
              setStatus={setStatus}
            />
            {formInput.map((inputItem: DynamicFormInputObject) => (
              <React.Fragment key={inputItem.name}>
                {inputItem.checkbox ? (
                  <DynamicFormCheckbox
                    inputItem={inputItem}
                    errors={errors}
                    touched={touched}
                  />
                ) : (
                  <DynamicFormInput
                    inputItem={inputItem}
                    errors={errors}
                    touched={touched}
                  />
                )}
                <br />
                {inputItem.hintText ? (
                  <span>
                    <p>
                      <i>{inputItem.hintText}</i>
                    </p>
                  </span>
                ) : null}
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
          </Form>
        )}
      />
    </>
  )
}
