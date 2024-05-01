import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import waitImage from './image.gif'; 
import Modal from 'react-modal';

const CurrentHimachalKings = (props: { isLoggedIn: boolean, currentHimachalKingsData: { number: number; date: string; }[], setCurrentHimachalKingsData: React.Dispatch<React.SetStateAction<{ number: number; date: string; }[]>> }) => {
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');

  const [currentNumber, setCurrentNumber] = useState<number | null>(() => JSON.parse(localStorage.getItem('himachalCurrentNumber') || 'null'));
  const [previousNumber, setPreviousNumber] = useState<number | null>(() => JSON.parse(localStorage.getItem('himachalPreviousNumber') || 'null'));
  const [isWaitImageVisible, setIsWaitImageVisible] = useState(() => JSON.parse(localStorage.getItem('himachalIsWaitImageVisible') || 'false'));
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem('himachalCurrentNumber', JSON.stringify(currentNumber));
    localStorage.setItem('himachalPreviousNumber', JSON.stringify(previousNumber));
    localStorage.setItem('himachalIsWaitImageVisible', JSON.stringify(isWaitImageVisible));
  }, [currentNumber, previousNumber, isWaitImageVisible]);

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  const { setCurrentHimachalKingsData } = props;

  useEffect(() => {
    axios.get('http://localhost:8000/api/getcurrenthimachals')
      .then(response => {
        const data = response.data;
        setCurrentHimachalKingsData(data);
    
        setCurrentNumber(data.length > 0 ? data[data.length - 1].number : null);
        setPreviousNumber(data.length > 1 ? data[data.length - 2].number : null);
        setIsWaitImageVisible(true);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [setCurrentHimachalKingsData]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
  
    const formattedDate = `${date}T00:00:00Z`;
    const numberValue = Number(number);
  
    setPreviousNumber(currentNumber);
    setCurrentNumber(numberValue);
    setIsWaitImageVisible(false);
  
    axios.post('http://localhost:8000/api/postcurrenthimachal', { number: numberValue, date: formattedDate })
    .then(response => {
      console.log(response.data);
  
      props.setCurrentHimachalKingsData(prevData => Array.isArray(prevData) ? [{ number: numberValue, date: formattedDate }, ...prevData] : [{ number: numberValue, date: formattedDate }]);
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
      <p className="table-himachal" style={{ backgroundColor: 'black', alignContent: 'center', alignItems: 'center' }}>HIMACHAL KING</p>
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

export default CurrentHimachalKings;