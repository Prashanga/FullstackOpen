import axios from 'axios';

const url = "http://localhost:3001/contacts";

const getAll = () => {
    let response = axios.get(url);
    return response.then(res=>res.data);
}

const deleteOne = (id) => {
    let response = axios.delete(`${url}/${id}`);
    return response.then(res=>res.data);

}

const postOne = (contact) => {
    let response = axios.post(url, contact);
    return response.then(res=> res.data);
}

const appendNumber = (contact) => {

    let contactsFound = axios.get(url)
    .then(res=> res.data.find(contacts => contacts.name === contact.name));

    let response = contactsFound
    .then(contactFoundinDb=> {
        let updatedContact = {...contactFoundinDb, number:contact.number};
        return axios.put(`${url}/${contactFoundinDb.id}`,updatedContact)     
    })
    

    return response.then(res=>res.data);

   

    
    
    

}

export default {
    getAll: getAll,
    deleteOne: deleteOne,
    postOne: postOne,
    appendNumber: appendNumber
}