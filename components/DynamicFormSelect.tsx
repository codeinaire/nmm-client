import React from 'react'
import { Field, FormikErrors, FormikTouched } from 'formik'
import {
  DynamicFormSelectObject,
  DynamicFormSelectArray,
  SelectOption
} from './types'

export default ({
  formSelect,
  errors,
  touched
}: {
  formSelect: DynamicFormSelectArray
  errors: FormikErrors<DynamicFormSelectObject>
  touched: FormikTouched<DynamicFormSelectObject>
}) => {
  return (
    <>
      {formSelect.map((selectItem: DynamicFormSelectObject) => (
        <Field name={selectItem.name}>
          {({ field }: { field: any }) => (
            <React.Fragment key={selectItem.name}>
              <br />
              <label htmlFor={selectItem.name}>
                <b>{selectItem.title}</b>:{' '}
                <Field
                  component='select'
                  id={`${selectItem.name}-select`}
                  key={selectItem.name}
                  {...field}
                >
                  {selectItem.options.map((selectOption: SelectOption) => (
                    <option value={selectOption.value} key={selectOption.value}>
                      {selectOption.displayName}
                    </option>
                  ))}
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
          )}
        </Field>
      ))}
    </>
  )
}
