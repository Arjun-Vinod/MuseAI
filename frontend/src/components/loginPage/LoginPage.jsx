import React from 'react'
import './LoginPage.css'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
const LoginPage = () => {
  return (
    <div className='main-container'>
        <div className="login-container">
            <div className="image-container">

            </div>

            <div className="form-container">
                <h2>HELLO!</h2>
                <form className='login-form'>
                    <div className='input-container'>
                        <FaUser className='icon'/>
                        <input type='email' placeholder='Enter Your email'  required/>

                    </div>
                    <div className='input-container'>
                        <RiLockPasswordFill className='icon' />
                        <input type='password' placeholder='Enter Your Password'  required/>
                    </div>
                    <button>Login</button>
                </form>
                <h4><a>Create Account</a></h4>
            </div>

        </div>
    </div>
  )
}

export default LoginPage
