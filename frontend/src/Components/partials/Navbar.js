import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';



const Navbar =  ({ currentUser }) => {
    const navigate = useNavigate();
    const handlelogout = async()=>{
        const response = await axios.get('http://localhost:8000/logout');
        console.log(response.data);
        localStorage.removeItem('token');
        localStorage.removeItem('isMentor');
        navigate('/login');
        
    } 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const category = formData.get('category'); 
        console.log('Selected category:', category);
        try {
          const response = await axios.get(`http://localhost:8000/getUsersByRole/${category}`);
          const mentorsWithRole = response.data;
        //   console.log('Mentors with selected category:', mentorsWithRole);
          navigate('/home/mentor/category', { state:{mentors:mentorsWithRole,category}});
        } catch (error) {
          console.error('Error fetching data:', error.message);
          console.error('Error details:', error.config);
        }  
      };
      
  return (
    <div className="main-navbar shadow-sm sticky-top">
      <div className="top-navbar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
              <h5 className="brand-name">Meeting Schedular</h5>
            </div>
            <div className="col-md-5 my-auto">
    <form onSubmit={handleSubmit} role="search">
      <div className="input-group">
        <select className="form-control" name="category" id="category" required>
          <option value="" disabled selected>Select a Category</option>
          <option value="Ecommerce">Ecommerce</option>
          <option value="Marketing">Marketing</option>
          <option value="Chain Management">FMCG Sales</option>
          <option value="Business Analystics">Business Analystics</option>
          <option value="Investment Banking">Investment Banking</option>
          <option value="Operations Management">Operations Management</option>
          <option value="Consulting">Consulting</option>
          <option value="Sales">Sales</option>
          <option value="Merchanding">Merchanding</option>
        </select>
        <button className="btn bg-white" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
            </div>
            <div className="col-md-5 my-auto">
              <ul className="nav justify-content-end">
                {currentUser && currentUser.role === 'seller' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/products/new">
                      <i className="fa fa-home"></i> Add Product
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                  <i class="fa-solid fa-house"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/wishlist">
                    <i className="fa fa-heart"></i> Wishlist ({currentUser ? currentUser.wishlist.length : 0})
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-user"></i> {currentUser ? currentUser.username : 'User'}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="#"><i className="fa fa-user"></i> Profile</Link></li>
                    <li><Link className="dropdown-item" to="#"><i className="fa fa-list"></i> My Orders</Link></li>
                    <li><Link className="dropdown-item" to="/user/wishlist"><i className="fa fa-heart"></i> My Wishlist</Link></li>
                    <li><Link className="dropdown-item" to="/home"><i class="fa-solid fa-house"></i>Home</Link></li>
                    <li>
                      <form onSubmit = {handlelogout} >
                        <button type="submit" className="dropdown-item"><i className="fa fa-sign-out"></i> Logout</button>
                      </form>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
