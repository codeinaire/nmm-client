import React from 'react'
import { Formik, Form, FormikProps } from 'formik'
import { Button } from 'grommet'
import Modal from './DynamicFormModal'
import DynamicFormCheckbox from './DynamicFormCheckbox'
import DynamicFormSelect from './DynamicFormSelect'
import DynamicFormInput from './DynamicFormInput'
import DynamicFormFieldArray from './DynamicFormFieldArray'

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
    formSelect = [],
    a11yTitle
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
          isSubmitting,
          status,
          setStatus,
          touched,
          values
        }: FormikProps<any>) => (
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
                ) : inputItem.fieldArray ? (
                  <DynamicFormFieldArray
                    inputItem={inputItem}
                    values={values}
                  />
                ) : (
                  <DynamicFormInput
                    inputItem={inputItem}
                    errors={errors}
                    touched={touched}
                  />
                )}
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
            <Button
              active={isSubmitting}
              a11yTitle={a11yTitle}
              color='red'
              data-testid='submit'
              disabled={isSubmitting}
              fill='horizontal'
              hoverIndicator={true}
              label={submitType}
              margin='medium'
              onClick={() => onSubmit}
              primary={true}
              type='submit'
            />
          </Form>
        )}
      </Formik>
    </>
  )
}
