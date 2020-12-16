import { ReactElement } from 'react'

interface Props {
   word: string
   count: number
}

export default function WordCard({ word, count }: Props): ReactElement {
   return (
      <li>
         {word} : {count}
      </li>
   )
}
