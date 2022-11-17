import { useEffect, useState } from 'react';
import './App.css';

function App() {

  // state variables to dynamically change UI
  const [color, setColor] = useState("");
  const [choices, setChoices] = useState(['']);
  const [responseText, setResponseText] = useState("");

  const getHex = () => {
    const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16);
    return randomHex;
  }

  const generateColors = () => {
    const hexAnswer = getHex();
    setColor(hexAnswer);

    setChoices([hexAnswer, getHex(), getHex()].sort(
      () => 0.5 - Math.random()
    ));
  } 

  // useEffect to generate random color
    // will run the first time the component mounts bc empty dependancy array is passed, 
    // without dependancy array, fn will run everytime component re-renders
  useEffect(() => {
    generateColors();
  }, []);

  // button event listener
  function handleChoiceClicked(choice) {
    const response = document.querySelector('.response')
    if (choice === color){
      setResponseText("yay !! good job c:");
      response.style.color = "green";
      generateColors();
    }
    else {
      setResponseText("oops.. try again :c");
      response.style.color = "red";
    }
  }
  
  return (
    <div className="App">
      <div className='color-box' style={{ backgroundColor: color }}>
        <span className='hexValue'>{color}</span>
      </div>

      <div className="button-div">
        {choices.map ((choice) => (
          <button 
            onClick={() => handleChoiceClicked(choice)}
            className='color-button' 
            key={choice}>
              {choice}
            </button>
        ))}
      </div>

     <span className='response' style={{}}>{responseText}</span> 

    </div>
  );
}

export default App;
