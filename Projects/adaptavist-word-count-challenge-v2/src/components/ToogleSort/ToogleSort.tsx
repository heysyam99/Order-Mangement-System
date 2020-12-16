import { ReactElement, useEffect, useState } from 'react'

import './ToogleSort.css'

interface Props {
   onModeChange: (mode) => void
   onSortingOrderChange: (sortingOrder) => void
}

export default function ToogleSort(props: Props): ReactElement {
   const { onModeChange, onSortingOrderChange } = props

   const [mode, setMode] = useState<string>('Alphabetical')
   const [sortingOrder, setSortingOrder] = useState<string>('Ascending')

   const modeChange = (): void => {
      setMode((oldMode) => {
         return oldMode === 'Alphabetical' ? 'Numerical' : 'Alphabetical'
      })
   }

   const sortingChange = (): void => {
      setSortingOrder((oldOrder) => {
         return oldOrder === 'Ascending' ? 'Descending' : 'Ascending'
      })
   }

   useEffect(() => {
      onModeChange(mode)
   }, [mode, onModeChange])

   useEffect(() => {
      onSortingOrderChange(sortingOrder)
   }, [sortingOrder, onSortingOrderChange])

   return (
      <>
         <button className="btn" onClick={modeChange}>
            {mode}
         </button>
         <button className="btn" onClick={sortingChange}>
            {sortingOrder}
         </button>
      </>
   )
}
