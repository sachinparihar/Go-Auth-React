import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import waitImage from './image.gif'; 
import Modal from 'react-modal';

const CurrentDubaiKings = (props: { isLoggedIn: boolean, currentDubaiKingsData: { number: number; date: string; }[], setCurrentDubaiKingsData: React.Dispatch<React.SetStateAction<{ number: number; date: string; }[]>> }) => {
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');

  const [currentNumber, setCurrentNumber] = useState<number | null>(() => JSON.parse(localStorage.getItem('dubaiCurrentNumber') || 'null'));
  const [previousNumber, setPreviousNumber] = useState<number | null>(() => JSON.parse(localStorage.getItem('dubaiPreviousNumber') || 'null'));
  const [isWaitImageVisible, setIsWaitImageVisible] = useState(() => JSON.parse(localStorage.getItem('dubaiIsWaitImageVisible') || 'false'));
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem('dubaiCurrentNumber', JSON.stringify(currentNumber));
    localStorage.setItem('dubaiPreviousNumber', JSON.stringify(previousNumber));
    localStorage.setItem('dubaiIsWaitImageVisible', JSON.stringify(isWaitImageVisible));
  }, [currentNumber, previousNumber, isWaitImageVisible]);

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  const { setCurrentDubaiKingsData } = props;

  useEffect(() => {
    axios.get('http://localhost:8000/api/getcurrentdubaikings')
      .then(response => {
        const data = response.data;
        setCurrentDubaiKingsData(data);
    
        setCurrentNumber(data.length > 0 ? data[data.length - 1].number : null);
        setPreviousNumber(data.length > 1 ? data[data.length - 2].number : null);
        setIsWaitImageVisible(true);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [setCurrentDubaiKingsData]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    const formattedDate = `${date}T00:00:00Z`;
    const numberValue = Number(number);
  
    setPreviousNumber(currentNumber);
    setCurrentNumber(numberValue);
    setIsWaitImageVisible(false);
  
    axios.post('http://localhost:8000/api/postcurrentdubaiking', { number: numberValue, date: formattedDate })
    .then(response => {
      console.log(response.data);
  
      props.setCurrentDubaiKingsData(prevData => Array.isArray(prevData) ? [{ number: numberValue, date: formattedDate }, ...prevData] : [{ number: numberValue, date: formattedDate }]);
      setNumber('');
      setDate('');
  
      timeoutIdRef.current = setTimeout(() => {
        setIsWaitImageVisible(true);
      }, 15 * 1000);
    })
    .catch(error => {
      console.error('There was an error!', error);
      console.log(error.response);
    });
  };

  return (
    <>
      <p className="table-dubai" style={{ backgroundColor: 'black', alignContent: 'center', alignItems: 'center' }}>DUBAI KING</p>
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

export default CurrentDubaiKings;