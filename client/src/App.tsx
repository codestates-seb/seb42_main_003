import React from 'react';
import './styles/global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import { GlobalStyle } from './styles/globalStyle';

function App() {
  //
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Search></Search>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
