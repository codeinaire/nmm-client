import React from 'react'
import { Formik, Field } from 'formik'
import ImageUpload from './FileUpload'
import Modal from '../components/Modal'

import {
  DynamicFormProps,
  DynamicFormInputObject,
  DynamicFormSelectObject,
  SelectOption,
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
    formSelect = [],
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
            <form onReset={handleReset} onSubmit={handleSubmit} method="POST">
              {formInput.map((inputItem: DynamicFormInputObject) => (
                <React.Fragment key={inputItem.name}>
                  {inputItem.checkbox ? (
                    <fieldset name={inputItem.name}>
                      <legend>{inputItem.legend}</legend>
                      {inputItem.checkboxInput!.map(
                        (checkboxItem: DynamicFormInputObject) => (
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
                        )
                      )}
                    </fieldset>
                  ) : (
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
                            : inputItem.name == 'lowResolution'
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
                  )}
                  {errors[inputItem.name] && touched[inputItem.name] ? (
                    <div
                      id={inputItem.errorMessageId}
                      data-testid={inputItem.errorMessageId}
                    >
                      {errors[inputItem.name]}
                    </div>
                  ) : null}
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
              {formSelect.length
                ? formSelect.map((selectItem: DynamicFormSelectObject) => (
                    <React.Fragment key={selectItem.name}>
                      <br />
                      <label htmlFor={selectItem.name}>
                        <b>{selectItem.title}</b>:{' '}
                        <Field
                          component="select"
                          name={selectItem.name}
                          id={`${selectItem.name}-select`}
                          key={selectItem.name}
                        >
                          {selectItem.options.map(
                            (selectOption: SelectOption) => (
                              <option
                                value={selectOption.value}
                                key={selectOption.value}
                              >
                                {selectOption.displayName}
                              </option>
                            )
                          )}
                        </Field>
                      </label>
                      {errors[selectItem.name] && touched[selectItem.name] ? (
                        <div
                          id={selectItem.errorMessageId}
                          data-testid={selectItem.errorMessageId}
                        >
                          {errors[selectItem.name]}
                        </div>
                      ) : null}
                      <br />
                    </React.Fragment>
                  ))
                : null}
              <br />
              <button data-testid="submit" type="submit">
                {submitType}
              </button>
            </form>
          </>
        )}
      </Formik>
    </>
  )
}
