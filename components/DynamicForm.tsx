import React from 'react';
import { Formik, Form, Field } from 'formik';

export default function DynamicForm(props: any) {
  const { formTest, validationSchema } = props;
  return (
    <>
      <Formik
        initialValues={formTest.reduce((acc: object, cur: any) => {
          return Object.assign(acc, {
            [cur.name]: ''
          })
        }, {})}
        onSubmit={(values, { setSubmitting }) => {
          console.log('This is values', values);
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({
          errors,
          touched
        }) => (
          <Form>
          {formTest.map((formItem: any) => (
            <>
              <label htmlFor={formItem.name}>{formItem.displayName}</label>
              <Field
                id={formItem.name}
                type={formItem.type}
                name={formItem.name}
                aria-errormessage={formItem.errorMessageId}
                aria-required={formItem.required}
                autocomplete={formItem.autocomplete}
                aria-invalid={!!errors[formItem.name]}
              />
              {errors[formItem.name] && touched[formItem.name] ? (
                <div id={formItem.errorMessageId}>{errors[formItem.name]}</div>
              ) : null}
              <br/>
            </>
          ))}
          <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  )
}
