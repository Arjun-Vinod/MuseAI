import React, { useState } from 'react';
import './RegisterPage.css';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/register',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      alert('Registration successful. Please log in.');
      navigate('/login'); // Redirect after successful registration
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
      console.log('Error:', err.response || err);
    }
  };

  return (
    <div className='main-container'>
      <div className='register-container'>
        <div className='image-container'></div>

        <div className='form-container'>
          <h2>HELLO!</h2>
          <h4>Get Started Now With MuseAI</h4>
          <form className='register-form' onSubmit={handleRegister}>
            <div className='input-container'>
              <MdOutlineDriveFileRenameOutline className='icon' />
              <input
                type='text'
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <button type='submit'>Register</button>
          </form>
          <h4>Already have an account?</h4>
          <h4 id='link'>
            <Link to='/login'>Login Here</Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
