import React from 'react'
import { Field, FieldArray } from 'formik'
import { DynamicFormInputObject } from './types'

export default ({
  inputItem,
  values
}: {
  inputItem: DynamicFormInputObject
  values: any
}) => {
  return (
    <>
      <FieldArray
        name={inputItem.name}
        render={arrayHelpers => (
          <div>
            <label htmlFor={inputItem.name}>
              <b>{inputItem.displayName}</b>: <br />
            </label>
            {values[inputItem.name] && values[inputItem.name].length > 0 ? (
              values[inputItem.name].map((_: any, index: number) => (
                <div key={index}>
                  <Field name={`${inputItem.name}.${index}`} />
                  <button
                    type='button'
                    onClick={() => arrayHelpers.remove(index)} // remove a item from the list
                  >
                    -
                  </button>
                  <button
                    type='button'
                    onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                  >
                    +
                  </button>
                </div>
              ))
            ) : (
              <button type='button' onClick={() => arrayHelpers.push('')}>
                {/* show this when user has removed all items from the list */}
                Add a {inputItem.displayName}
              </button>
            )}
          </div>
        )}
      />
    </>
  )
}
