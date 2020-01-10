import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MostVotes = ({votes,anecdotes}) => {
  let keys= Object.keys(votes);
  let maxValue = 0;
  let maxValueIndex;
  
  keys.forEach((key)=>{
      if(votes[key]>maxValue){
        maxValue=votes[key]
        maxValueIndex=key}
  });
    
   
    //maxValueIndex is the index value of the maximum no. of votes

  return(
    <div>
      <h2>Anecdotes with most votes</h2>
     {(maxValue>0) && <p>{anecdotes[maxValueIndex]}</p>}
    </div>
  )
}



const App = (props) => {
    
    //Select a random value as a Hook called selected which is an index of array that is currently generated randomly
  const [selected, setSelected] = useState(Math.floor(Math.random() * (props.anecdotes.length)))
  
    //Change the random number of index currently selected
  const changeRandomValue = ()=>setSelected(Math.floor(Math.random() * (props.anecdotes.length)));
  
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
          [selected]: votes[selected]+1
      }
  
    addVotes(newVotes);
  }

    


  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]}<br />
      <p> has {votes[selected]} votes</p>
      <button onClick={changeRandomValue} >next anecdote</button>
      <button onClick={changeVote} >vote</button>
      <MostVotes votes={votes} anecdotes={props.anecdotes} />
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