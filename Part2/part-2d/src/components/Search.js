import React from 'react';

const Search = ({sMatch}) => (sMatch.map((match,i)=><p key={i}>{match.name}   {match.number}</p>))




export default Search;