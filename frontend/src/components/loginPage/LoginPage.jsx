import React, { useState } from 'react';
import './LoginPage.css';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/poem-generator'); 
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className='main-container'>
      <div className='login-container'>
        <div className='image-container'></div>

        <div className='form-container'>
          <h2>HELLO!</h2>
          <form className='login-form' onSubmit={handleSubmit}>
            <div className='input-container'>
              <FaUser className='icon' />
              <input
                type='email'
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='input-container'>
              <RiLockPasswordFill className='icon' />
              <input
                type='password'
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className='error-message'>{error}</p>}
            <button type='submit'>Login</button>
          </form>
          <h4>New to MuseAI?</h4>
          <h4 id='link'>
            <Link to='/register'>Create Account</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
