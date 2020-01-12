import React from 'react'

const Numbers = ({numbers}) => (
    numbers.map((number,i)=><p key={i}>{number.name}    {number.number}</p>)
)

export default Numbers;