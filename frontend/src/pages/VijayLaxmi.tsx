import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import waitImage from './img/wait.gif';
import Modal from 'react-modal';

const VijayLaxmiForm = (props: { isLoggedIn: boolean; vijayLaxmiData: { number: number; date: string; }[]; setVijayLaxmiData: React.Dispatch<React.SetStateAction<{ number: number; date: string; }[]>>; }) => {
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');

  const [currentNumber, setCurrentNumber] = useState<number | null>(() => JSON.parse(localStorage.getItem('vijayLaxmiCurrentNumber') || 'null'));
  const [previousNumber, setPreviousNumber] = useState<number | null>(() => JSON.parse(localStorage.getItem('vijayLaxmiPreviousNumber') || 'null'));
  const [isWaitImageVisible, setIsWaitImageVisible] = useState(() => JSON.parse(localStorage.getItem('isWaitImageVisible') || 'false'));
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null); // Create a ref for the timeout ID

  useEffect(() => {
    localStorage.setItem('vijayLaxmiCurrentNumber', JSON.stringify(currentNumber));
    localStorage.setItem('vijayLaxmiPreviousNumber', JSON.stringify(previousNumber));
    localStorage.setItem('isWaitImageVisible', JSON.stringify(isWaitImageVisible));
  }, [currentNumber, previousNumber, isWaitImageVisible]);

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  
  const { setVijayLaxmiData } = props;

  useEffect(() => {
    axios.get('http://localhost:8000/api/getvijaylaxmis') // Replace with VijayLaxmi API endpoint
      .then(response => {
        const data = response.data;
        setVijayLaxmiData(data);

        setCurrentNumber(data.length > 0 ? data[data.length - 1].number : null);
        setPreviousNumber(data.length > 1 ? data[data.length - 2].number : null);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [setVijayLaxmiData]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const formattedDate = `${date}T00:00:00Z`;

    const numberValue = Number(number);

    // Immediately shift the current number to the previous number and set the new number as the current number
    setPreviousNumber(currentNumber);
    setCurrentNumber(numberValue);

    axios.post('http://localhost:8000/api/postvijaylaxmi', { number: numberValue, date: formattedDate }) // Replace with VijayLaxmi API endpoint
      .then(response => {
        console.log(response.data);

        props.setVijayLaxmiData(prevVijayLaxmiData => Array.isArray(prevVijayLaxmiData) ? [{ number: numberValue, date: formattedDate }, ...prevVijayLaxmiData] : [{ number: numberValue, date: formattedDate }]);
        setNumber('');
        setDate('');

        // Schedule the timeout to display the wait image after 15 seconds
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
      <td className="table-vijaylaxmi" style={{ backgroundColor: '#ffd800' }}>VIJAY LAXMI <br />12:40 PM</td>
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

export default VijayLaxmiForm;