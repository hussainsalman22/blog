"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import ".//login.css"


function SignUp() {

  const route = useRouter()

  let [user, setuser] = useState({
    email: "",
    password: "",

  })

  const handleChange = (e) => {
    // console.log(e.target.name)
    setuser({ ...user, [e.target.name]: e.target.value })


  }




  const submit = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/users/Login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: user
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
       
        localStorage.setItem("user_id", response.data.data._id)
        localStorage.setItem("data",response.data.data.name)
        // route.push("/Components/blog/Home")
        response.data.data==0? (
          alert("user not found")
        )
        :
        (
          route.replace("/Components/blog/Home" , { scroll: false })
        )

      })

      .catch((error) => {
        console.log(error);
      });

  }




  return (
 
    <div className='mx-5'>
      <h3 className='text-center'>Sign In</h3>

      <div className="mb-3">
        <label>Email address</label>
        <Input
          type="email"
          className="form-control"
          placeholder={'admin'}
          handleChange={handleChange}
          value={user.email}
          name="email"
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <Input
          type="password"
          className="form-control"
          placeholder="admin"
          handleChange={handleChange}
          value={user.password}
          name="password"

        />
      </div>

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <div className="d-grid">
        <button onClick={()=>submit()} className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p>

    </div>
  );




  
}

export const Input = ({ type, placeholder, value, name, handleChange }) => {
  return (
    <input className='border-2 '
      value={value}
      onChange={(e) => handleChange(e)}
      type={type} placeholder={placeholder} name={name} />
  )
}



export default SignUp