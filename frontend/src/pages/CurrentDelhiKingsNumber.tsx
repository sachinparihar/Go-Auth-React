// CurrentDelhiKingsNumber.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import waitImage from './img/wait.gif'; // Import the wait image

const CurrentDelhiKingsNumber = () => {
  const [currentNumber, setCurrentNumber] = useState<number | null>(() => JSON.parse(localStorage.getItem('delhiKingsCurrentNumber') || 'null'));
  const [isWaitImageVisible, setIsWaitImageVisible] = useState(true); // Set to true initially
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Create a ref for the timeout ID

  useEffect(() => {
    // Only fetch the current number if it's not already stored in local storage
    if (currentNumber === null) {
      axios.get('http://localhost:8000/api/getdelhikings') // Replace with Delhi Kings API endpoint
        .then(response => {
          const data = response.data;
          setCurrentNumber(data.length > 0 ? data[data.length - 1].number : null);
          setIsWaitImageVisible(false); // Set to false after successfully fetching the current number
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }
  }, [currentNumber]);

  useEffect(() => {
    // Clear the timeout when the current number changes
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

    // Hide the wait image when the current number changes
    setIsWaitImageVisible(false);

    // Set a timeout to display the wait image after 15 seconds
    timeoutIdRef.current = setTimeout(() => {
      setIsWaitImageVisible(true);
    }, 15 * 1000);
  }, [currentNumber]);

  useEffect(() => {
    // Update the local storage whenever the current number or wait image visibility changes
    localStorage.setItem('delhiKingsCurrentNumber', JSON.stringify(currentNumber));
    localStorage.setItem('isWaitImageVisible', JSON.stringify(isWaitImageVisible));
  }, [currentNumber, isWaitImageVisible]);

  return (
    <>
    <div style={{alignContent:'center'}}>
      <h2>Delhi Kings</h2>
      {isWaitImageVisible ? (
        <img src={waitImage} alt="Wait" />
      ) : currentNumber !== null ? (
        <p style={{color: 'white'}}> {currentNumber}</p>
      ) : (
        <p>Loading...</p>
      )}
      </div>
    </>
  );
};

export default CurrentDelhiKingsNumber;
export {};