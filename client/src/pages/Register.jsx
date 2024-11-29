import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = 'http://localhost:4000'; //set backend base URL

export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const request = await axios.post('/api/auth/register',{name,email,password})
            const response = request.data 

            if(request.status == 200){
                toast.success(response.message)
            }
            console.log(response);
        } catch (error) {
            console.log(error); 
        }
    }

    return(
        <>
        <div className="register-container">
            <h2>Register</h2>
            <form action="" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" name="" id="username"
                onChange={(e) => setName(e.target.value)}
                 />
            </div>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="" id="email" 
                onChange={(e) => setEmail(e.target.value)}
                 />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="" id="password"
                onChange={(e) => setPassword(e.target.value)}
                 />
            </div>

            <button type="submit">Register</button>

            <p className="register-link">
                Already have an account? <Link to={'/login'}>Login Here!</Link>
            </p>
            </form>
        </div>
        </>
    )
}
