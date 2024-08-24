import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useNavigation} from 'react-router-dom';
import './Register.css';

function RegisterPage() {
    const [isMentor, setIsMentor] = useState(false);
    const [roles, setRoles] = useState([]);
    const [availability, setAvailability] = useState({ start: '', end: '' });
    const navigate = useNavigate();
    const handleIsMentorChange = (event) => {
        setIsMentor(event.target.checked);
    };

    const handleRoleChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setRoles((prevRoles) => [...prevRoles, value]);
        } else {
            setRoles((prevRoles) => prevRoles.filter((role) => role !== value));
        }
    };

    const handleAvailabilityChange = (event) => {
        const { name, value } = event.target;
        setAvailability((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, such as sending data to your backend API
        const formData = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            isMentor,
            roles: isMentor ? roles : null,
            availability: isMentor ? availability : null,
            phoneNumber: event.target.phoneNumber.value,
        };
        axios.post('http://localhost:8000/register', formData)
            .then(response => {
                // Handle the response from the backend
                console.log(response.data);
            })
            .catch(error => {
                // Handle any errors that occur during the API call
                console.error(error);
            });
            navigate('/login');  

    };

    return (
        <>
            <form onSubmit={handleSubmit} className="register-form">
                <h1>Register</h1>
                <div>
                    <label>
                        Name:
                        <input type="text" name="name" className="name-input" required />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="email" name="email" className="email-input" required />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" name="password" className="password-input" required />
                    </label>
                </div>
                <div>
                    <label>
                        Phone Number:
                        <input type="tel" name="phoneNumber" className="phone-input" required />
                    </label>
                </div>
                <div className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={isMentor}
                        onChange={handleIsMentorChange}
                        className="checkbox-input"
                    />
                    <label>Are you a Mentor?</label>
                </div>
                {isMentor && (
                    <>
                        <div>
                            <label>
                                Role(s):
                                <div className="role-input">
                                <label>
                            <input
                                type="checkbox"
                                value="E-Commerce"
                                checked={roles.includes('E-Commerce')}
                                onChange={handleRoleChange}
                            />
                            E-Commerce
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Marketing"
                                checked={roles.includes('Marketing')}
                                onChange={handleRoleChange}
                            />
                            Marketing
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Chain Management"
                                checked={roles.includes('Chain Management')}
                                onChange={handleRoleChange}
                            />
                            FMCG Sales
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Business Analystics"
                                checked={roles.includes('Business Analystics')}
                                onChange={handleRoleChange}
                            />
                            Business Analystics
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Investment Banking"
                                checked={roles.includes('Investment Banking')}
                                onChange={handleRoleChange}
                            />
                            Investment Banking
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Operations Management"
                                checked={roles.includes('Operations Management')}
                                onChange={handleRoleChange}
                            />
                            Operations Management
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Consulting"
                                checked={roles.includes('Consulting')}
                                onChange={handleRoleChange}
                            />
                            Consulting
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Sales"
                                checked={roles.includes('Sales')}
                                onChange={handleRoleChange}
                            />
                            Sales
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Merchanding"
                                checked={roles.includes('Merchanding')}
                                onChange={handleRoleChange}
                            />
                            Merchanding
                        </label>

                                    {/* Add more options as needed */}
                                </div>
                                <small> (Select multiple roles)</small>
                            </label>
                        </div>
                        <div className="availability-input">
                            <label>
                                Availability:
                                <input
                                    type="time"
                                    name="start"
                                    value={availability.start}
                                    onChange={handleAvailabilityChange}
                                    className="start-time-input"
                                />
                                to
                                <input
                                    type="time"
                                    name="end"
                                    value={availability.end}
                                    onChange={handleAvailabilityChange}
                                    className="end-time-input"
                                />
                            </label>
                        </div>
                        <div>
                            <label>
                                Description:
                                <textarea
                                    name="description"
                                    className="description-input"
                                    required />
                            </label>
                        </div>
                    </>
                )}
                <div>
                    <button type="submit" className="register-button">
                        Register
                    </button>
                </div>
                <p>
                    Already have an account? <a href="/">Login</a>
                </p>
            </form>
        </>
    );
}

export default RegisterPage;