import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Modal from './components/Modal';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<Modal />} />
          <Route path="/edit/:id" element={<Modal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
