import React from 'react'
import { Routes, Route } from'react-router-dom'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Home from './Components/Home'
import MentorDetails from './Components/Mentors/MentorDetails'
import MentorCategory from './Components/Mentors/MentorCategory'
import Appointment from './Components/Appointment/Appointment'


function App() {
  return (
    <div>
       <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home/>} />
        <Route path= 'mentor/users/:id' element={<MentorDetails />} />
        <Route path='home/mentor/category' element={<MentorCategory />} />  
        <Route path= 'home/mentor/appointment' element={<Appointment />} />
      </Routes>
    </div>
  )   
}

export default App
