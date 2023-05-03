import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../axios/api';
import Cookies from 'universal-cookie';

const Login = () => {
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        email: "",
        password: ""
    });

    const onValueChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(userInput);
        if(response.data.status === "success"){
            const cookies = new Cookies();
            cookies.set('userToken', response.data.token, { path: '/' });
            navigate("/");
        } else {
            toast.error(response.data.msg);
        }
    }

    const showPassword = () => {
        const pass = document.getElementById("password");
        if (pass.type === "password") {
            pass.type = "text";
        } else {
            pass.type = "password";
        }
    }
    return (
        <div className='page'>
            <div className='bg-info rounded p-3' style={{width: 400}}>
                <form className='d-flex flex-column' action="" onSubmit={(e)=>handleSubmit(e)}>
                    <div className='d-flex flex-column align-items-center'>
                        <img src={logo} style={{height: 50, width: 50}} alt="logo" />
                        <h1>Login</h1>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="username" className='form-label'>Username</label>
                        <input type="text" className='form-control' name='username' placeholder='Username' onChange={(e)=>onValueChange(e)} required/>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="password" className='form-label'>Password</label>
                        <input type="password" className='form-control' id='password' name='password' placeholder='Password' onChange={(e)=>onValueChange(e)} required/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="checkBoxPass" onClick={()=> showPassword()}/>
                        <label className="form-check-label" htmlFor="checkBoxPass">Show Password</label>
                    </div>
                    <button className='btn btn-secondary' type='submit'>Login</button>
                    <div className="my-2">
                        <p className="form-label">Dont have an account yet?&nbsp;
                            <Link to={"/register"}>
                            Sign Up 
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Login