import React from 'react';
import Display from './Display'
import ReactDOM from 'react-dom';


const Search = ({sMatch}) => 
{
    
 
    const showButtonHandler = (country) =>{
              
        console.log("Pressed",country)
        return(
            ReactDOM.render(<Display country={country} />, document.getElementById(country.name))
        )
    }

    


    return(sMatch.map((match,i)=>
                <div key={i} >
                    <p>{match.name}  <button onClick={()=>showButtonHandler(match)}>Show</button></p>
                    <div id={match.name}></div>
                </div>
            ))
}
                



export default Search;