import React, { useState, useEffect } from 'react';
import Numbers from './components/Numbers';
import Input from './components/Input';
import Search from './components/Search';
import contactService from './services/contacts'
import Notification from './components/Notification'

const App = () => {

  const [searchQuery,setSearchQuery] = useState('');
  const [searchMatch, setSearchMatch] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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

    //generates random id;
    let guid = () => {
      let s4 = () => {
          return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      }
      //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }


  const formSubmitHandler = (event) => {
    event.preventDefault();

    //If the name doesn't exist in the phonebook
    if(names.indexOf(newName.toLocaleLowerCase())===-1){

      let tempName =  {name: newName, number: newNumber, id: guid()};
      contactService.postOne(tempName)
      .then(res=>{
        setContacts(contacts.concat(res));
        setNames(names.concat(res.name.toLocaleLowerCase()));
        setNewName('');
        setNewNumber('');
        setNotificationMessage(`${res.name} successfully added to the phonebook`);
        setTimeout(() => {setNotificationMessage(null)}, 5000)
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
            setNotificationMessage(`${res.name}'s contact number successfully changed to ${res.number}`);
            setTimeout(() => {setNotificationMessage(null)}, 5000)
          })
          .catch(err=>{
            setErrorMessage(`Contact already removed or is no longer present`);
            setTimeout(() => {
              setErrorMessage(null);
              setContacts(contacts.filter(contact=>contact.name!==newName));
              setNames(names.filter(name=>name!==newName.toLowerCase())); 
              setNewName('');
              setNewNumber('');
            }, 3000)
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
          setNotificationMessage(`${contactClicked.name} successfully deleted`);
          setTimeout(() => {setNotificationMessage(null)}, 5000)
          console.log(res);
        })
        .catch(err=>{
          setErrorMessage(`Contact already removed or is no longer present`);
          setTimeout(() => {
            setErrorMessage(null);
            setContacts(contacts.filter(contact=>contact.name!==newName));
            setNames(names.filter(name=>name!==newName.toLowerCase()));
            setNewName('');
              setNewNumber('');
          }, 3000)
        });
    }
      
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <p>filter shown with
        <Input value={searchQuery} onChangeHandler={searchQueryHandler} />
      </p>        
      
      <h2>add a new</h2>
      <Notification notificationType="success" message={notificationMessage} />
      <Notification notificationType="error" message={errorMessage} />
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