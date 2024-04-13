// DelhiKings.tsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import waitImage from './img/wait.gif'; 
import Modal from 'react-modal';

const DelhiKingsForm = (props: { isLoggedIn: boolean, delhiKingsData: { number: number; date: string; }[], setDelhiKingsData: React.Dispatch<React.SetStateAction<{ number: number; date: string; }[]>> }) => {
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');

  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [previousNumber, setPreviousNumber] = useState<number | null>(null);
  const [isWaitImageVisible, setIsWaitImageVisible] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Create a ref for the timeout ID

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  const { setDelhiKingsData } = props;

  useEffect(() => {
    axios.get('http://localhost:8000/api/getdelhikings') // Replace with Delhi Kings API endpoint
      .then(response => {
        const data = response.data;
        setDelhiKingsData(data);
    
        setCurrentNumber(data.length > 0 ? data[data.length - 1].number : null);
        setPreviousNumber(data.length > 1 ? data[data.length - 2].number : null);
        setIsWaitImageVisible(true);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [setDelhiKingsData]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    const formattedDate = `${date}T00:00:00Z`;
    const numberValue = Number(number);
  
    // Clear the timeout and hide the wait image when a new number is added
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    setIsWaitImageVisible(false);
  
    console.log({ number: numberValue, date: formattedDate }); // Add this line to log the data

    axios.post('http://localhost:8000/api/postdelhiking', { number: numberValue, date: formattedDate }) // Replace with Delhi Kings API endpoint
    .then(response => {
      console.log(response.data);
  
      // Immediately shift the current number to the previous number and set the new number as the current number
      setCurrentNumber(prevCurrentNumber => {
        if (prevCurrentNumber !== null) {
          setPreviousNumber(prevCurrentNumber);
        }
        return numberValue;
      });
  
      props.setDelhiKingsData(prevDelhiKingsData => Array.isArray(prevDelhiKingsData) ? [{ number: numberValue, date: formattedDate }, ...prevDelhiKingsData] : [{ number: numberValue, date: formattedDate }]);
      setNumber('');
      setDate('');
  
      // Schedule the timeout to display the wait image after 15 seconds
      timeoutIdRef.current = setTimeout(() => {
        setIsWaitImageVisible(true);
        // Move the current number to the previous number when the wait image appears
        setPreviousNumber(currentNumber);
        setCurrentNumber(null);
      }, 15 * 1000);
    })
    .catch(error => {
      console.error('There was an error!', error);
      console.log(error.response);
    });
  };

  return (
    <>
      <td className="table-delhi" style={{ backgroundColor: '#ffd800' }}>DELHI KING<br />7:30 PM</td>
      <td className="table-numberdate">{previousNumber}</td>
      <td className="table-numberdate">{isWaitImageVisible ? <img src={waitImage} alt="Wait" /> : currentNumber}</td>        
      {props.isLoggedIn && (
        <>
          <button onClick={openModal}style={{fontWeight:'bold', background: '#ffd800', borderRadius: '5px'}}>ADD</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add Number Modal"
          >
            <form onSubmit={handleSubmit} className="input-form">
              <label>
                Number:
                <input type="text" value={number} onChange={e => setNumber(e.target.value)} required className="input-field" />
              </label>
              <label>
                Date:
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="input-field" />
              </label>
              <button type="submit" style={{background: 'green', fontWeight: 'bold' }}>ADD</button>
              <button onClick={closeModal} style={{ background: 'red', fontWeight: 'bold' }}>CLOSE</button>
            </form>
          </Modal>
        </>
      )}
    </>
  );
};

export default DelhiKingsForm;