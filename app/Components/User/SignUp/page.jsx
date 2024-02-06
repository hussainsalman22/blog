"use client"
import React, { useState } from 'react'
import axios from 'axios'


function SignUp() {

    let [user, setuser] = useState({
        email: "",
        password: "",
        name: "",
        number: ""
    })

    const handleChange = (e) => {
        // console.log(e.target.name)
        setuser({ ...user, [e.target.name]: e.target.value })


    }

    const submit = () => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/users/SignUp',
            headers: {
                'Content-Type': 'application/json'
            },
            data: user
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert(response.data.message + "now you signin")
                window.location.reload()
            })
            .catch((error) => {
                console.log(error);
            });

    }



    return (
        <>
           <div  className="max-w-md flex flex-col gap-3 mx-auto p-4 bg-white rounded shadow-md">
  <h1 className="text-2xl text-center font-bold mb-2 ">Create Account</h1>
  <input
    type="text"
    onChange={handleChange}
    placeholder="Enter Name"
    value={user.name}
    name="name"
    className="mb-2 p-2 w-full border border-gray-300 rounded"
  />
  <input
    type="email"
    onChange={handleChange}
    placeholder="Enter Email"
    value={user.email}
    name="email"
    className="mb-2 p-2 w-full border border-gray-300 rounded"
  />
  <input
    type="password"
    onChange={handleChange}
    placeholder="Enter Password"
    value={user.password}
    name="password"
    className="mb-2 p-2 w-full border border-gray-300 rounded"
  />
  <input
    type="number"
    onChange={handleChange}
    placeholder="Enter Number"
    value={user.number}
    name="number"
    className="mb-2 p-2 w-full border border-gray-300 rounded"
  />
  <br></br>
  <button
    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
    onClick={() => submit()}
  >
    Create Account
  </button>
</div>

        </>

    )
}




export default SignUp