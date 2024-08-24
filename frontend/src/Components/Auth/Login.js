import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // useNavigate

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/login', { email, password });
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('isMentor', response.data.isMentor);
                navigate('/home'); // navigate to '/'
            }
        catch(error){
            setError('Invalid email or password');
        }
    };
   
    return (
        <div className="head">
        <div className="signin-container">
            <h2 className="signin-heading">Login</h2>
            <form className="signin-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <br />
                    <input className="form-input" type="email" name='email' value={email} placeholder='email' onChange={handleEmailChange} required />
                </div>
                <div className="form-group">
                   <label className="form-label">Password:</label>
                   <br />
                    <input className="form-input" type="password" name='password' value={password} placeholder='password' onChange={handlePasswordChange} required />
                </div>
                <button className="signin-button" type="submit">Sign In</button>
                <p className="signin-message">You don't have an account? Please <NavLink className="signin-link" to={'/register'}>Register</NavLink></p>
                {error && <p className="signin-error">{error}</p>}
            </form>
        </div>
        </div>
    );
};

export default Login;
