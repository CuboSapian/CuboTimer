import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast';

const Login = () => {
    const [credetials, setCredetials] = useState({email: "" , password: ""})
    let history= useNavigate();
    const handleSubmit= async (e)=> {
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({email: credetials.email , password: credetials.password})
        });
        const json=await response.json();
        console.log(json);
        if(json.success){
            //Save the auth Token and Redirect
            localStorage.setItem('token' , json.authtoken);
            toast.success("Logged In Successfully");
            history("/");
        }
        else{
            toast.error("Wrong Credeintials");
        }
    }

    const onChange = (e)=>{
        setCredetials({...credetials, [e.target.name]: e.target.value})
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credetials.email} id="email" onChange={onChange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credetials.password} id="password" onChange={onChange} name="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>

        </>
    )
}

export default Login
