import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home.jsx'
import Index from './Index.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
