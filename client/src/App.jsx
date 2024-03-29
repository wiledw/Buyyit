import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
    <Navbar />
    <Toaster position='top-center' toastOptions={{duration: 2000}}/>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/buy' element={<Buy />} />
      <Route path='/sell' element={<Sell />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </UserContextProvider>
  )
}

export default App
