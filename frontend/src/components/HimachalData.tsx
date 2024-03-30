// HimachalData.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface IHimachalData {
  number: number;
  date: string;
}

const HimachalData: React.FC = () => {
  const [himachalData, setHimachalData] = useState<IHimachalData[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/gethimachals')
      .then(response => {
        const data = response.data;
        setHimachalData(data); // Update the local state
        console.log(data); // Log the data to the console
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []); // Empty dependency array means this effect runs once on mount

  return (

    <div className='container'>
      <h1 style={{ textAlign: 'center' }}>HIMACHAL CHARTS</h1>

      <div className='center-table'>
        <table className="table-style">
          <thead className="table-header">
            <tr>
              <th style={{ textAlign: 'center' }}>Date</th>
              <th style={{ textAlign: 'center' }}>Number</th>
            </tr>
          </thead>
          <tbody>
            {himachalData.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center' }} className='table-delhi colored-cell'>{item.date}</td>
                <td style={{ textAlign: 'center' }} className='table-delhi colored-cell'>{item.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HimachalData;