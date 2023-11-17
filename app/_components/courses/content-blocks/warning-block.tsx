import React from 'react'

type WarningBlockProps = {
  children: React.ReactNode
}

const WarningBlock = ({children}: WarningBlockProps) => {
  return (
    <div className='bg-red-300/20 p-5 mx-auto rounded-lg text-red-400 text-center'>
      {children}
    </div>
  )
}

export default WarningBlock