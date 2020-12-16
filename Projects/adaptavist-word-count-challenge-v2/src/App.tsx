import React, { ReactElement, useState } from 'react'
import './App.css'

import TextArea from './components/TextArea/TextArea'
import ToogleSort from './components/ToogleSort/ToogleSort'
import WordFrequencyList from './components/WordFrequency/WordFrequency'

function Title({ title }: ITittle): ReactElement {
   return <h1>{title}</h1>
}

function App() {
   const [words, setWords] = useState<string>('')
   const [sortingMode, setSortingMode] = useState<string>('Alphabetical')
   const [sortingOrderMode, setSortingOrderMode] = useState<string>('Ascending')

   const handleChange = (value: string): void => {
      setWords(value)
   }

   const sortingModeChange = (mode: string): void => {
      setSortingMode(mode)
   }

   const sortingOrderChange = (order: string): void => {
      setSortingOrderMode(order)
   }

   return (
      <div className="App">
         <Title title="Adaptavist Word Count Challenge" />
         <TextArea onChange={handleChange} />
         <div>
            <ToogleSort
               onModeChange={sortingModeChange}
               onSortingOrderChange={sortingOrderChange}
            />
         </div>
         <WordFrequencyList
            words={words}
            sortingMode={sortingMode}
            sortingOrderMode={sortingOrderMode}
         />
      </div>
   )
}

interface ITittle {
   title: string
}

export default App
