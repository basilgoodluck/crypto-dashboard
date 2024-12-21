import React from 'react'


const FormatPrice: React.FC<{ children: number }> = ({ children }) => {
    function formatNumber(amount: number) {
        if (amount >= 1_000_000) {
            return `${(amount / 1_000_000).toFixed(1)}m`; 
        } else if (amount >= 1_000) {
            return `${(amount / 1_000).toFixed(1)}k`; 
        } else {
            return amount.toString(); 
        }
    }
      
  return (
    <>{formatNumber(children)}</>
  )
}

export default FormatPrice