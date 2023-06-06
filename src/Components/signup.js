import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [credetials, setCredetials] = useState({ userName: "", email: "", password: "", cpassword: "" })
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, password } = credetials;
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth Token and Redirect
      localStorage.setItem('token', json.authtoken);
      history("/");
      toast.success("Logged In Successfully");
    }
  }

  const onChange = (e) => {
    setCredetials({ ...credetials, [e.target.name]: e.target.value })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input type="text" className="form-control" value={credetials.userName} id="userName" onChange={onChange} name="userName" required minLength={3} aria-describedby="emailHelp" />
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credetials.email} id="email" onChange={onChange} name="email" required aria-describedby="emailHelp" />
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credetials.password} id="password" onChange={onChange} name="password" required minLength={8} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" value={credetials.cpassword} id="cpassword" onChange={onChange} name="cpassword" required minLength={8} />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>

    </>
  )
}

export default Signup
