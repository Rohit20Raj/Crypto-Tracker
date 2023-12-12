import React from 'react'
import '../styles/SelectButton.css'

function SelectButton({children, selected, onClick}) {
  return (
    <span onClick={onClick} className='selectButton'>
      {children}
    </span>
  )
}

export default SelectButton