import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
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
      <Route path='/marketplace' element={<Marketplace />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
    </UserContextProvider>
  )
}

export default App
