import React, {useState} from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";


function App() {
  const [name, setName] = useState('');
  const [justLoggedOut, setJustLoggedOut] = useState(false);

  const handleLogout = () => {
    setName('');
    setJustLoggedOut(true);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Nav key={name} name={name} setName={handleLogout} />

        <main className="form-signin">
          <Routes>
            <Route path="/" element={<Home name={name} justLoggedOut={justLoggedOut} />} />
            <Route path="/login" element={<Login setName={setName} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
export default App;
