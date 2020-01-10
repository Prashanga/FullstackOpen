import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    
    //Select a random value as a Hook called selected which is an index of array that is currently generated randomly
  let randomValue = Math.floor(Math.random() * (props.anecdotes.length))
  
    //Change the random number of index currently selected
    const changeRandomValue = ()=>(randomValue = (Math.floor(Math.random() * (props.anecdotes.length))))
  
// Initialize an empty object that will latrer store votes
  let votesObj={};

    //create votesObj that corresponding to all elements of the array passed
  for(let i=0;i<props.anecdotes.length;i++){
      votesObj[i]=0;
  }

  const [votes, addVotes] = useState(votesObj);


  const changeVote = ()  => {
      const newVotes = {
          ...votes,
          [randomValue]: votes[randomValue]+1
      }
    //console.log(selected);
    addVotes(newVotes);
    

    }


  return (
    <div>
      {props.anecdotes[randomValue]}<br />
      <p> has {votes[randomValue]} votes</p>
      <button onClick={changeRandomValue} >next anecdote</button>
      <button onClick={changeVote} >vote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'This is a test anecdote'
];


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)