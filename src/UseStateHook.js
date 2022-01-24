import React, { useState, useEffect } from "react";

import TestComponent from "./TestComponent";

const UseStateHook = () => {
  const [counter, setCounter] = useState(5);
  const [secondCount, setSecondCount] = useState(1);
  const [showComponent, setShowComponent] = useState(true);
  useEffect(() => {
    setCounter(counter + 1);
  }, [secondCount]); //it tells useEffect only run when something inside array changes
  // it runs only once as array is empty
  return (
    <div className='useStateHook'>
      <h2>useState counter {counter}</h2>
      {/* <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increment Counter
      </button>
      <button
        onClick={() => {
          setCounter(counter - 1);
        }}
      >
        Decrement Counter
      </button> */}

      <button
        onClick={() => {
          setSecondCount(secondCount + 1);
        }}
      >
        increment Second Counter {secondCount}
      </button>
      <button
        onClick={() => {
          setShowComponent(false);
        }}
      >
        Hide below component
      </button>

      <button
        onClick={() => {
          setShowComponent(true);
        }}
      >
        Show below component
      </button>
      {showComponent && <TestComponent></TestComponent>}
    </div>
  );
};

export default UseStateHook;
