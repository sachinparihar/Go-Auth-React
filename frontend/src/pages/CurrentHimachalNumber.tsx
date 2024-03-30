// CurrentHimachalNumber.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import waitImage from './img/wait.gif'; // Import the wait image

const CurrentHimachalNumber = () => {
  const [currentNumber, setCurrentNumber] = useState<number | null>(() => JSON.parse(localStorage.getItem('himachalCurrentNumber') || 'null'));
  const [isWaitImageVisible, setIsWaitImageVisible] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Create a ref for the timeout ID

  useEffect(() => {
    // Only fetch the current number if it's not already stored in local storage
    if (currentNumber === null) {
      axios.get('http://localhost:8000/api/gethimachals') // Replace with Himachal API endpoint
        .then(response => {
          const data = response.data;
          setCurrentNumber(data.length > 0 ? data[data.length - 1].number : null);
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

    const waitTime = 15 * 1000; // 15 seconds
    const currentTime = new Date().getTime();
    const setTime = Number(localStorage.getItem('setTime')) || currentTime;
    const remainingTime = waitTime - (currentTime - setTime);

    if (remainingTime <= 0) {
      // If the remaining time is less than or equal to 0, display the wait image immediately
      setIsWaitImageVisible(true);
    } else {
      // Otherwise, set a timeout with the remaining time
      timeoutIdRef.current = setTimeout(() => {
        setIsWaitImageVisible(true);
      }, remainingTime);
    }
  }, [currentNumber]);

  useEffect(() => {
    // Update the local storage whenever the current number or wait image visibility changes
    localStorage.setItem('himachalCurrentNumber', JSON.stringify(currentNumber));
    localStorage.setItem('isWaitImageVisible', JSON.stringify(isWaitImageVisible));
    localStorage.setItem('setTime', String(new Date().getTime()));
  }, [currentNumber, isWaitImageVisible]);

  return (
    <>
    <div style={{alignContent:'center'}}>
      <h2>Himachal</h2>
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

export default CurrentHimachalNumber;
export {};