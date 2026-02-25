import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import { Payment } from "./pages/Payment";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Payment />}>
        </Route>
      </Routes>
    </>
  );
}

export default App
