// App.tsx
import React, { useState } from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Charts from './pages/Charts';
import Contact from './pages/Contact';

function App() {
  const [name, setName] = useState('');
  const [delhiKingsNumbers, setDelhiKingsNumbers] = useState<{ number: number; date: string; }[]>([]);
  const [vijayLaxmiNumbers, setVijayLaxmiNumbers] = useState<{ number: number; date: string; }[]>([]);
  const [dubaiKingNumbers, setDubaiKingNumbers] = useState<{ number: number; date: string; }[]>([]);
  const [himachalDates, setHimachalDates] = useState<any[]>([]);

  const handleLogout = () => {
    setName('');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Nav key={name} name={name} setName={handleLogout} />

        <main className="form-signin">
          <Routes>
            <Route path="/" element={<Home name={name} numberDates={[]} setNumberDates={function (_value: React.SetStateAction<{ number: number; date: string; }[]>): void {
              throw new Error('Function not implemented.');
            }} delhiKingsNumbers={delhiKingsNumbers} setDelhiKingsNumbers={setDelhiKingsNumbers} vijayLaxmiNumbers={vijayLaxmiNumbers} setVijayLaxmiNumbers={setVijayLaxmiNumbers} dubaiKingNumbers={dubaiKingNumbers} setDubaiKingNumbers={setDubaiKingNumbers} himachalDates={himachalDates} setHimachalDates={setHimachalDates} justLoggedOut={false} />} />
            <Route path="/login" element={<Login setName={setName} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/charts/*" element={<Charts />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;