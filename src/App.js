import { useEffect, useState } from 'react';
import './App.css';

function App() {

  // STATE VARIABLES TO DYNAMICALLY CHANGE UI
  const [color, setColor] = useState("");
  const [choices, setChoices] = useState(['']);
  const [responseText, setResponseText] = useState("");

  // GENERATE RANDOM HEX CODE
  //  - 16777215 rgb values bt #000000 - #ffffff (16^6)
  //  - multiply by Math.random() (returns float 0 >= n < 1)
  //  - cut float down to integer for hex conversion w Math.floor()
  //  - toString() converts num to string in hexadecimal format w 16 as argument
  //      - argument is the base you intend to use (base 16 is hexadecimal)
  const getHex = () => {
    const randomHex = "#" + Math.floor(Math.random()*16777215).toString(16);
    return randomHex;
  }

  // GENERATE BG COLOR + OTHER BUTTON CHOICES
  const generateColors = () => {
    // one hex code saved as bg color / answer
    const hexAnswer = getHex();
    setColor(hexAnswer);

    // random sorted array of button hex choices
    setChoices([hexAnswer, getHex(), getHex()].sort(
      () => 0.5 - Math.random()
    ));
  } 

  // USEEFFECT CALLED TO GENERATE COLOR CHOICES
    // will run the first time the component mounts bc empty dependancy array [] is passed
    // without dependancy array, fn will run everytime component re-renders
  useEffect(() => {
    generateColors();
  }, []);

  // BUTTON EVENT LISTENER
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
        {/* mapping hex code choices (options) to create new button array*/}
        {choices.map((choice) => (
          <button 
            onClick={() => handleChoiceClicked(choice)}
            className='color-button' 
            key={choice}>
              {choice}
            </button>
        ))}
      </div>

     <span className='response'>{responseText}</span> 

    </div>
  );
}

export default App;
