import { ReactElement } from 'react'

export default function WordCount({ mappedWord, lastWord }): ReactElement {
   return (
      <>
         <span style={{ margin: '10px 0' }}>
            Frequency for "{lastWord}" is {mappedWord[lastWord]}
         </span>
      </>
   )
}
