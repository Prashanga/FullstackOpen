import React,{ useState } from 'react';
import ReactDOM from 'react-dom';

const History = (props) => {
    if (props.allClicks.length === 0) {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }
  
    return (
      <div>
        button press history: {props.allClicks.join(' ')}
      </div>
    )
}

const Button = ({handleClick,text}) => {
    return(
        <button onClick={handleClick}>{text}</button>
    )

}

const App = (props) => {
    
  
    const [clicks,setClicks] = useState({
        left:0,
        right:0
    });
    const [allClicks, setAllClicks] = useState([]);

    const handleLeftClick = () => {setClicks({
        ...clicks,
        left: clicks.left+1,
    });
    setAllClicks(allClicks.concat('Left'));
}

    const handleRightClick = () => {setClicks({
        ...clicks,
        right: clicks.right+1,
    });
    setAllClicks(allClicks.concat('Right'));
}

    const resetClick = () => {
        setClicks({
        right:0,left:0
    }); 
    setAllClicks(allClicks.concat('RESET'));
}
  
    return (
      <div>
        <div>
          {clicks.left}
       
          <Button handleClick={handleLeftClick} text="Left" />
          <Button handleClick={handleRightClick} text="Right" />
          {clicks.right}
          <p><button onClick={resetClick}>Reset</button></p>
         <History allClicks={allClicks} />
        </div>
      </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'));

