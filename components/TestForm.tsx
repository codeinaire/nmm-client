import React from 'react';
import { Formik, Form, Field } from 'formik';
import { object, string } from 'yup';

export default function FormTest () {
  const SignInSchema = object().shape({
    email: string()
      .email('Invalid email')
      .required('Required'),
    password: string()
      .min(8, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
    motivation: string()
      .min(10, 'More!')
      .required('Required')
  })
  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', motivation: '' }}
        onSubmit={(values, { setSubmitting }) => {
          console.log('This is values', values);
          setSubmitting(false);
        }}
        validationSchema={SignInSchema}
      >
        {({
          errors,
          touched,
          isValid
        }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="email"
              name="email"
              aria-errormessage='emailError'
              aria-required="true"
              autocomplete="on"
              aria-invalid={!isValid}
            />
            {errors.email && touched.email ? (
              <div id='emailError'>{errors.email}</div>
            ) : null}
            <br/>
            <label htmlFor="password">Password</label>
            <br/>
            <Field
              id="password"
              type="password"
              name="password"
              aria-errormessage='passwordError'
              aria-required="true"
              aria-invalid={!isValid}
            />
            <br />
            {errors.password && touched.password ? (
              <div id='passwordError'>{errors.password}</div>
            ) : null}
            <label htmlFor="motivation">Motivation</label>
            <br />
            <Field
              name='motivation'
              id='motivation'
              type='text'
              aria-errormessage='motivationError'
              aria-required="true"
              aria-invalid={!!errors.motivation}
            />
            {errors.motivation && touched.motivation ? (
              <div id='motivationError'>{errors.motivation}</div>
            ) : null}
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  )
}