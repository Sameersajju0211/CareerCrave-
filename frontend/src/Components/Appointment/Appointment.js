import React from 'react'
import { useState } from 'react';
import './Appointment.css'
import Navbar from '../partials/Navbar';

function Appointment() {
    const [slot, setSlot] = useState('');
    const [time, setTime] = useState('');

    const handleSlotChange = (e) => {
        setSlot(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    const formatTime = (time) => {
        // Format the time input as a time
        const formattedTime = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return formattedTime;
    };

    return (
        <div className="appointment-container">
            <Navbar />
            <h1 className="appointment-title">Appointments</h1>
            <p className="appointment-description">This is where you can schedule appointments with mentors.</p>
            {/* Add appointment form */}
            <form className="appointment-form" onSubmit={handleSubmit}>
                <label className="appointment-label" htmlFor="slot">Select Slot:</label>
                <select className="appointment-select" id="slot" value={slot} onChange={handleSlotChange}>
                    <option className="appointment-option" value="">Select Slot</option>
                    <option className="appointment-option" value="30">30 minutes</option>
                    <option className="appointment-option" value="40">40 minutes</option>
                    <option className="appointment-option" value="50">50 minutes</option>
                </select>

                <label className="appointment-label" htmlFor="time">Enter Start Time:</label>
                <input className="appointment-input" type="time" id="time" value={time} onChange={handleTimeChange} />

                <button className="appointment-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Appointment;
