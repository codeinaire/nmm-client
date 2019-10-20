import React from 'react';
import { Formik, Form, Field } from 'formik';
import { DynamicFormProps, DynamicFormObject } from './types';

// TODO - STYLING
// TODO - placeholder for inputs explaining pw conditions
export default function DynamicForm(props: DynamicFormProps) {
  const { formTest, validationSchema, onSubmit, submitType } = props;
  return (
    <>
      <Formik
        initialValues={formTest.reduce((acc: object, cur: any) => {
          return Object.assign(acc, {
            [cur.name]: ''
          })
        }, {})}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          errors,
          touched
        }) => (
          <Form>
          {formTest.map((formItem: DynamicFormObject) => (
            <React.Fragment key={formItem.name}>
              <label htmlFor={formItem.name}>{formItem.displayName}</label>
              <Field
                id={formItem.name}
                type={formItem.type}
                name={formItem.name}
                aria-errormessage={formItem.errorMessageId}
                aria-required={formItem.required}
                autoComplete={formItem.autocomplete}
                aria-invalid={!!errors[formItem.name]}
              />
              {errors[formItem.name] && touched[formItem.name] ? (
                <div id={formItem.errorMessageId}>{errors[formItem.name]}</div>
              ) : null}
              <br/>
            </React.Fragment>
          ))}
          <button type="submit">{submitType}</button>
          </Form>
        )}
      </Formik>
    </>
  )
}
