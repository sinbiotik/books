import React from 'react';
import {Route, Routes} from 'react-router-dom'
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <HomePage/> } />        
        <Route path='/about/:id' element={ <AboutPage /> } />
      </Routes>      
    </>
  );
}

export default App;
