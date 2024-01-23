import React, {useState} from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  const [name, setName] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName} />

        <main className="form-signin">
          <Routes>
            <Route path="/" element={<Home name={name} />} />
            <Route path="/login" element={<Login setName={setName} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;