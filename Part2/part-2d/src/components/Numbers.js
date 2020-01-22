import React from 'react'

const Numbers = ({numbers,deleteHandleClick}) => (
    numbers.map((number,i)=><p key={i}>{number.name}    {number.number} <button onClick={()=>deleteHandleClick(number)}>Delete</button></p>)
)

export default Numbers;