import React from 'react'
import { Field, FormikErrors, FormikTouched } from 'formik'
import {
  DynamicFormSelectObject,
  DynamicFormSelectArray,
  SelectOption
} from './types'
import { Heading } from 'grommet'

export default function DynamicFormSelect({
  formSelect,
  errors,
  touched
}: {
  formSelect: DynamicFormSelectArray
  errors: FormikErrors<DynamicFormSelectObject>
  touched: FormikTouched<DynamicFormSelectObject>
}) {
  return (
    <>
      {formSelect.map((selectItem: DynamicFormSelectObject) => (
        <Field key={selectItem.name} name={selectItem.name}>
          {({ field }: { field: any }) => (
            <React.Fragment key={selectItem.name}>
              <br />
              <label htmlFor={`{selectItem.name}-select`}>
                <Heading
                  className='impactFont'
                  textAlign='center'
                  margin='small'
                >
                  {selectItem.title}
                </Heading>
                <br />
                <Field
                  component='select'
                  id={`${selectItem.name}-select`}
                  key={selectItem.name}
                  {...field}
                >
                  {selectItem.options.map((selectOption: SelectOption) => (
                    <option
                      value={selectOption.value}
                      key={selectOption.displayName}
                    >
                      {selectOption.displayName}
                    </option>
                  ))}
                </Field>
              </label>
              {errors[selectItem.name] && touched[selectItem.name] ? (
                <div
                  className='errors'
                  id={selectItem.errorMessageId}
                  data-testid={selectItem.errorMessageId}
                >
                  Error: {errors[selectItem.name]}
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
