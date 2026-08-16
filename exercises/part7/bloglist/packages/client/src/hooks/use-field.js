import { useState } from 'react'

const useField = (type = 'text') => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    props: {
      type,
      value,
      onChange,
    },
    getValue: () => value.trim(),
    reset: () => setValue(''),
  }
}

export default useField
