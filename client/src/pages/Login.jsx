import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/AuthSlice";

axios.defaults.baseURL = 'http://localhost:4000'; //set backend base URL

export default function Login() {

    const dispatch = useDispatch()
    const navigate =useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email, password);
        try {
            const request = await axios.post('/api/auth/login', { email, password })
            const response = request.data 

            if(request.status == 200){
                if(response.user.role == 'admin'){
                    navigate('/admin')
                }else if(response.user.role == 'user'){
                    navigate('/')
                }
                toast.success(response.message)
                dispatch(SetUser({ user: response.user }))
            }

            console.log(response)
        } catch (error) {
            console.log(error);
            toast.error("Login Failed")
        }
    }

    return(
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* email  */}
                    <div className="input-group">
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="" id="email"
                            onChange={(e) => setEmail(e.target.value)}
                         />
                    </div>

                    {/* password  */}
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="" id="password"
                            onChange={(e) => setPassword(e.target.value)}
                         />
                    </div>

                    {/* submit  */}
                    <button type="submit">Login</button>  

                    <p className="register-link">
                        Not registered? <Link to={'/register'}>Register here!</Link>
                    </p>

                </form>
            </div>
        
        </>
    )
}