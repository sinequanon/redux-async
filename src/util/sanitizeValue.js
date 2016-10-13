import React from 'react'

const constructElementWithValue = (value) => {
  let element
  if (value) {
    element = document.createElement('textarea')
    element.innerHTML = value
  }
  return element
}

export const sanitizeValue = (unsanitizedValue) => {
  let sanitizedValue
  if (unsanitizedValue) {
    const element = constructElementWithValue(unsanitizedValue)
    sanitizedValue = element.value
  }
  return sanitizedValue
}

export const createReactDescriptorFromHTML = (value) => {
  const element = constructElementWithValue(value)
  let reactDescriptor
  if (element) {
    reactDescriptor = <div dangerouslySetInnerHTML={{ __html: element.value }}>
    </div>
  }
  return reactDescriptor
}
