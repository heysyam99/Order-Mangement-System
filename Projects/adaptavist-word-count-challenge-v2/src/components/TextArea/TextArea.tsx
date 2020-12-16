import { ChangeEvent, ReactElement } from 'react'

interface Props {
   onChange: (value: string) => void
}

export default function TextArea({ onChange }: Props): ReactElement {
   const inputChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value)
   }

   return <textarea onChange={inputChanged} style={{ minWidth: '250px', minHeight: '75px' }} />
}
