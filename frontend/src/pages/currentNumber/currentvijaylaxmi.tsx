import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import waitImage from './image.gif'; 
import Modal from 'react-modal';

const CurrentVijayLaxmi = (props: { isLoggedIn: boolean, currentVijayLaxmiData: { number: number; date: string; }[], setCurrentVijayLaxmiData: React.Dispatch<React.SetStateAction<{ number: number; date: string; }[]>> }) => {
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');

  const [currentNumber, setCurrentNumber] = useState<number | null>(() => JSON.parse(localStorage.getItem('vijayLaxmiCurrentNumber') || 'null'));
  const [previousNumber, setPreviousNumber] = useState<number | null>(() => JSON.parse(localStorage.getItem('vijayLaxmiPreviousNumber') || 'null'));
  const [isWaitImageVisible, setIsWaitImageVisible] = useState(() => JSON.parse(localStorage.getItem('vijayLaxmiIsWaitImageVisible') || 'false'));
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem('vijayLaxmiCurrentNumber', JSON.stringify(currentNumber));
    localStorage.setItem('vijayLaxmiPreviousNumber', JSON.stringify(previousNumber));
    localStorage.setItem('vijayLaxmiIsWaitImageVisible', JSON.stringify(isWaitImageVisible));
  }, [currentNumber, previousNumber, isWaitImageVisible]);

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  const { setCurrentVijayLaxmiData } = props;

  useEffect(() => {
    axios.get('http://localhost:8000/api/getcurrentvijaylaxmi')
      .then(response => {
        const data = response.data;
        setCurrentVijayLaxmiData(data);
    
        setCurrentNumber(data.length > 0 ? data[data.length - 1].number : null);
        setPreviousNumber(data.length > 1 ? data[data.length - 2].number : null);
        setIsWaitImageVisible(true);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [setCurrentVijayLaxmiData]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    const formattedDate = `${date}T00:00:00Z`;
    const numberValue = Number(number);
  
    setPreviousNumber(currentNumber);
    setCurrentNumber(numberValue);
    setIsWaitImageVisible(false); // Immediately hide the wait image
  
    axios.post('http://localhost:8000/api/postcurrentvijaylaxmi', { number: numberValue, date: formattedDate })
    .then(response => {
      console.log(response.data);
  
      props.setCurrentVijayLaxmiData(prevData => Array.isArray(prevData) ? [{ number: numberValue, date: formattedDate }, ...prevData] : [{ number: numberValue, date: formattedDate }]);
      setNumber('');
      setDate('');
  
      // Ensure any previous timeout is cleared before setting a new one
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
  
      timeoutIdRef.current = setTimeout(() => {
        setIsWaitImageVisible(true); // Show the wait image after 15 seconds
      }, 15000); // Make sure this is 15000 for 15 seconds
    })
    .catch(error => {
      console.error('There was an error!', error);
      console.log(error.response);
    });
  };

  return (
    <>
      <p className="table-vijaylaxmi" style={{ backgroundColor: 'black', alignContent: 'center', alignItems: 'center' }}>VIJAY LAXMI</p>
      <p className="table-numberdate">{isWaitImageVisible ? <img src={waitImage} alt="Wait" /> : currentNumber}</p>        
      {props.isLoggedIn && (
        <>
          <button onClick={openModal} style={{fontWeight:'bold', background: '#ffd800', borderRadius: '5px'}}>ADD</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Add Current Number Modal"
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

export default CurrentVijayLaxmi;