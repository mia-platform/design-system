import { ReactElement, Ref, forwardRef as forwardref, useImperativeHandle, useRef } from 'react'
import AutocompleteInput from 'react-autocomplete-input'
import { InputRef } from 'antd'

import { Input } from '../Input'
import { InputProps } from '../Input/props.ts'

import 'react-autocomplete-input/dist/bundle.css'

const InnerInput = forwardref(
  function InnerInput(props: InputProps, ref: Ref<HTMLInputElement | null>): ReactElement {
    const inputRef = useRef<InputRef>(null)

    useImperativeHandle(ref, () => inputRef.current?.input || null)

    return <Input inputRef={inputRef} {...props} />
  }
)

const startStr = '{{'
const endStr = '}}'

type TextCompletionProps = {
  value?: never;
  onChange?: (value: never) => never
}

export const TextCompletion = ({ value, onChange }: TextCompletionProps) : ReactElement => {
  return (
    <AutocompleteInput
      Component={InnerInput}
      changeOnSelect={(_, slug) => `${startStr}${slug}${endStr}`}
      options={{ [startStr]: ['CRUD_SERVICE_URL', 'SECRET_KEY'] }}
      spacer=""
      trigger={[startStr]}
      value={value}
      onChange={onChange}
    />
  )
}
