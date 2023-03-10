import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/globalStyle';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path='/test' element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
