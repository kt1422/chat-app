import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { register } from '../axios/api';

const Register = () => {
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onValueChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await register(userInput);
        if(response.data.status === "success"){
            navigate("/login");
        } else {
            toast.error(response.data.msg);
        }
    }

    return (
        <div className='page'>
            <div className='bg-info rounded p-3' style={{width: 400}}>
                <form className='d-flex flex-column' action="" onSubmit={(e)=>handleSubmit(e)}>
                    <div className='d-flex flex-column align-items-center'>
                        <img src={logo} style={{height: 50, width: 50}} alt="logo" />
                        <h1>Register</h1>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="username" className='form-label'>Username</label>
                        <input type="text" className='form-control' name='username' placeholder='Username' onChange={(e)=>onValueChange(e)} required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" className='form-control' name='email' placeholder='Email' onChange={(e)=>onValueChange(e)} required/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" className='form-control' name='password' placeholder='Password' onChange={(e)=>onValueChange(e)} required/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="confirmPassword" className='form-label'>Confirm Password</label>
                        <input type="password" className='form-control' name='confirmPassword' placeholder='Confirm Password' onChange={(e)=>onValueChange(e)} required/>
                    </div>
                    <button className='btn btn-secondary' type='submit'>Create User</button>
                    <div className="my-2">
                        <p className="form-label">Already have an account?&nbsp;
                            <Link to={"/login"}>
                            Sign In  
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Register