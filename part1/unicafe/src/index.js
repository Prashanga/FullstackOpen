import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button =({handleClick}) =>{
  return(
    <div>
      <button onClick={()=>handleClick('good')}> good </button>
      <button onClick={()=>handleClick('neutral')}> neutral </button>
      <button onClick={()=>handleClick('bad')}> bad </button>
    </div>
  ); 
}

const Statistics = ({good,neutral,bad,total}) => (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good+neutral+bad}</p>
      <p>average {total===0?0:(good-bad)/total}</p>
      <p>positive {total===0?0:good/total*100}</p>
    </div>
  );




const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  // const [feedbackGiven,setFeedbackGiven] = useState(false);
  

  let total = good+bad+neutral;
  const increment= event => {
    //setFeedbackGiven(true);
    switch (event){
        case 'good':
            return setGood(good+1);
            
        case 'neutral':
            return setNeutral(neutral+1);
            
        case 'bad':
            return setBad(bad+1);
            
        default:
            break;
    }
}


  return (
    <div>
     <h1>Give Feedback</h1>
     <Button handleClick={increment} />
     <h1>statistics</h1>

    {total > 0 &&
      <Statistics good={good} bad={bad} neutral={neutral} total={total} />}
    {total===0 &&
    
    <p>No feedback given</p>}
     </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)