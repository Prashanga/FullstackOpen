import React, { useState, useEffect } from 'react';
import Numbers from './components/Numbers';
import Input from './components/Input';
import Search from './components/Search';
import contactService from './services/contacts'

const App = () => {

  const [searchQuery,setSearchQuery] = useState('');
  const [searchMatch, setSearchMatch] = useState([]);

  const [contacts, setContacts] =  useState([]);
  //Array of just the names
  const [names, setNames] = useState([]);

  const hook = () => {
   let allContacts = contactService.getAll();
    allContacts.then(response=>setContacts(response))
    allContacts.then(res => setNames(res.map(contact=> contact.name.toLowerCase())))
  }

  useEffect(hook,[]);


  

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

    //If the name doesn't exist in the phonebook
    if(names.indexOf(newName.toLocaleLowerCase())===-1){

      let tempName =  {name: newName, number: newNumber, id: contacts.length+1};
      contactService.postOne(tempName)
      .then(res=>{
        setContacts(contacts.concat(res));
        setNames(names.concat(res.name.toLocaleLowerCase()));
        setNewName('');
        setNewNumber('');
      })
      
    }

    //If the contact exists
    else{
      let result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if(result){
          let newContact = {name: newName,number: newNumber};
          let newUpdatedContact = contactService.appendNumber(newContact)
          newUpdatedContact.then(res=>{
            setContacts(contacts.map(contact=>contact.id===res.id?res:contact))
          })
      }
    }

  }

  const searchQueryHandler = (event) =>
  {
    let search = event.target.value;
    setSearchQuery(search);
    let match = contacts.filter(person => person.name.toLowerCase().search(search.toLowerCase())!==-1)
    setSearchMatch(match);
  }

  const deleteHandleClick = (contactClicked) =>{
    let result = window.confirm(`Delete ${contactClicked.name}`);
    if(result){
      contactService.deleteOne(contactClicked.id)
        .then(res=>{
          let newContacts = contacts.filter(contact=>contact.id !== contactClicked.id);
          setContacts(newContacts);
          console.log(res);
        })
        .catch(err=>{console.log("Contact already deleted or isn't present")});
    }
      
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
      {searchMatch.length>0?<Search sMatch={searchMatch} />:<Numbers numbers={contacts} deleteHandleClick={deleteHandleClick}/>}
      
    </div>
  )
}

export default App;