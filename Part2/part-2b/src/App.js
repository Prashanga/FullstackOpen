import React, { useState } from 'react';
import Numbers from './components/Numbers';
import Input from './components/Input';
import Search from './components/Search';

const App = () => {

  const [searchQuery,setSearchQuery] = useState('');
  const [searchMatch, setSearchMatch] = useState([]);

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  //Array of just the names
  const [names, setNames] = useState(persons.map(person=>person.name))

  const [ newName, setNewName ] = useState('');//Name typed in input textarea
  const [ newNumber, setNewNumber ] = useState('');

  const inputNameHandler = (event) =>(
    setNewName(event.target.value)
  );

  const inputNumberHandler = (event) =>(
    setNewNumber(event.target.value)
  );

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if(names.indexOf(newName)===-1){
      let tempName =  {name: newName, number: newNumber};
      setPersons(persons.concat(tempName));
      setNames(names.concat(newName));
      setNewName('');
      setNewNumber('');
    }
    else{
      alert(`${newName} is already added to phonebook`)
    }

  }

  const searchQueryHandler = (event) =>
  {
    let search = event.target.value;
    setSearchQuery(search);
    let match = persons.filter(person => person.name.toLowerCase().search(search.toLowerCase())!==-1)
    setSearchMatch(match);
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with
        <Input value={searchQuery} onChangeHandler={searchQueryHandler} />
      </p>        
      
      <h2>add a new</h2>
      
      <form onSubmit={formSubmitHandler}>
        <div>
          name:     
          <Input value={newName} onChangeHandler={inputNameHandler} />      
        </div>
        <div>
          number:      
          <Input value={newNumber} onChangeHandler={inputNumberHandler} />        
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>


      <h2>Numbers</h2>
      {searchMatch.length>0?<Search sMatch={searchMatch} />:<Numbers numbers={persons} />}
      
    </div>
  )
}

export default App;