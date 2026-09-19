import Map from './pages/Map';
import Dashboard from './pages/Dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function NotFound() {
  return (
    <div className='w-full h-screen flex justify-center items-center text-2xl'>
      <p>Halaman tidak ada.</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/map' element={<Map />}></Route>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}