import React, { ReactElement, useEffect, useState } from 'react'

import WordCard from '../WordCard/WordCard'
import WordCount from '../WordCount/WordCount'
import './WordFrequency.css'

interface Props {
   words: string
   sortingMode: string
   sortingOrderMode: string
}

/**
 * @desc will return the frequency of word in TextArea
 * component where the {key} is the word itself and sort
 * base on the mode and order arrangment
 *
 * @return object - { [Word: string]: [amount: number] }
 */
const mapWord = ({ listWord, sortingMode, sortingOrderMode }) => {
   const mappedWord = listWord.reduce((acc, curr) => {
      acc[curr] = !acc[curr] ? 1 : ++acc[curr]

      return acc
   }, {})

   // Sorting function based on sorting mode and sorting order mode
   const sortWord = ([keyA, valueA]: any, [keyB, valueB]: any) => {
      if (sortingMode === 'Alphabetical') {
         if (sortingOrderMode === 'Ascending') {
            return keyA < keyB ? -1 : 1
         }

         return keyA < keyB ? 1 : -1
      }

      return sortingOrderMode === 'Ascending' ? valueA - valueB : valueB - valueA
   }

   const mappedWordSort = Object.entries(mappedWord)
      .sort(sortWord)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

   return mappedWordSort
}

export default function WordFrequencyList(props: Props): ReactElement {
   const { words, sortingMode, sortingOrderMode } = props

   const [listWord, setListWord] = useState<Array<string>>([])
   const [currWord, setCurrWord] = useState<string>('')
   const [mappedWord, setMappedWord] = useState<object>()

   useEffect(() => {
      const listWords = words.split(' ').filter(Boolean)

      setListWord(listWords)
   }, [words])

   useEffect(() => {
      const lastWord = listWord[listWord.length - 1]

      setCurrWord(lastWord)
      setMappedWord(mapWord({ listWord, sortingMode, sortingOrderMode }))
   }, [listWord, sortingMode, sortingOrderMode])

   const renderWordCard = () => {
      return Object.keys(mappedWord).map((key) => {
         /**
          * @desc Generate random key instead of using index for key
          * The order of the item may change and causes duplicate
          * Refer to Section 7 on:
          * https://github.com/airbnb/javascript/tree/master/react#props
          *
          */
         const ramdomKey = performance.now().toString(36) + Math.random().toString(36).substr(2)

         return <WordCard key={ramdomKey} word={key} count={mappedWord[key]} />
      })
   }

   return (
      <>
         {currWord && (
            <>
               <WordCount mappedWord={mappedWord} lastWord={currWord} />
               <h4>List of Word</h4>
               <ul className="word-list">{renderWordCard()}</ul>
            </>
         )}

         {
            // Render when there is no word
            !currWord && <span>Start typing...</span>
         }
      </>
   )
}
