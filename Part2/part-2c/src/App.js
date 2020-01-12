import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Input from './components/Input';
import Display from './components/Display'
import axios from 'axios';


const App = () => {

  const [searchQuery,setSearchQuery] = useState('');
  const [searchMatch, setSearchMatch] = useState([]);
  const [countries, setCountries] = useState([]);
  

  
  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            let countries = response.data;
            // console.log(countries)
            setCountries(countries)
          })
  }
  useEffect(hook, []);

  
  const searchQueryHandler = (event) =>
  {
    let search = event.target.value;
    setSearchQuery(search);
    let match = countries.filter(country => country.name.toLowerCase().search(search.toLowerCase())!==-1)
    setSearchMatch(match);
    
  }

  

  return (
    <div>
      
      <p>find countries  
        <Input value={searchQuery} onChangeHandler={searchQueryHandler} />
      </p>
      {searchMatch.length===0 && <p>Enter Country</p>}
      {searchMatch.length>0&&searchMatch.length<10&&searchMatch.length!==1 && 
      <div>
      <Search sMatch={searchMatch} />
      
      </div>}
      {searchMatch.length>10 && <p>Too many matches, specify another filter</p>}
      {searchMatch.length===1 && <Display country={searchMatch[0]} />}
      
     
      
    </div>
  )
}

export default App;