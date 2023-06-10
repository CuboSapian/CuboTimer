import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import './login.css'

const Login = () => {
    const [credetials, setCredetials] = useState({ email: "", password: "" })
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credetials.email, password: credetials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save the auth Token and Redirect
            localStorage.setItem('token', json.authtoken);
            toast.success("Logged In Successfully");
            history("/timer");
        }
        else {
            toast.error("Wrong Credeintials");
        }
    }

    const onChange = (e) => {
        setCredetials({ ...credetials, [e.target.name]: e.target.value })
    }

    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                    <div className='alignment'>
                        <h1 className='form-text heading'>LOGIN</h1>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-text">Email address</label><br />
                            <input type="email" className="form-input" value={credetials.email} id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-text">Password</label><br />
                            <input type="password" className="form-input" value={credetials.password} id="password" onChange={onChange} name="password" />
                        </div>

                        <button type="submit" className="buttonC" >Submit</button>
                    </div>
            </form>
        </div>
        </>
    )
}

export default Login
