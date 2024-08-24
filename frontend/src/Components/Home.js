import React from 'react'
import Navbar from './partials/Navbar'
import Mentor from './Mentors/Mentor';

function Home() {
  const isMentor = localStorage.getItem('isMentor');
  return (
    <div>
      <Navbar />
      <h1>Welcome to Our Portal</h1>
      <Mentor />
    </div>
  )
}

export default Home
