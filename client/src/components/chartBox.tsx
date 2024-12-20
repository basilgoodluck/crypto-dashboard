import React from 'react'


const ChartBox: React.FC<{ children: React.ReactNode, gridArea: string }> = ({ children, gridArea }) => {
  return (
    <div 
      className="p-4 block shadow-xl shadow-black bg-white rounded-lg"
      style={{ gridArea }}
    >
      <div className="h-full w-full">
        {children}
      </div>
    </div>

  )
}

export default ChartBox