import React from 'react'
import './RegisterPage.css'
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
const RegisterPage = () => {
  return (
    <div className='main-container'>
        <div className="register-container">
            <div className="image-container">

            </div>

            <div className="form-container">
                <h2>HELLO!</h2>
                <h4>Get Started Now With MuseAI</h4>
                <form className='register-form'>
                    <div className="input-container">
                        <MdOutlineDriveFileRenameOutline className='icon'/>
                        <input type='name' placeholder='Enter Your Name' required/>
                    </div>
                    <div className='input-container'>
                        <FaUser className='icon'/>
                        <input type='email' placeholder='Enter Your email'  required/>

                    </div>
                    <div className='input-container'>
                        <RiLockPasswordFill className='icon' />
                        <input type='password' placeholder='Enter Your Password'  required/>
                    </div>
                    <button>Register</button>
                </form>
            </div>

        </div>
    </div>
  )
}

export default RegisterPage
