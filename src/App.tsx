import React from 'react';
import {Route, Routes} from 'react-router-dom'
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { MyBookshelf } from './pages/MyBookshelf';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <HomePage/> } />        
        <Route path='/about/:id' element={ <AboutPage /> } />
        <Route path='/bookshelf' element={ <MyBookshelf /> } />        
      </Routes>      
    </>
  );
}

export default App;
