import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toaster from "toasted-notes";

const Login = ({ setAuth }) => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const { email, password } = values;
    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    const handleSubmit = async e => {
        const body = { email, password }
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/users/login',
                {
                    method: 'POST', headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify(body)
                });
            const parseResponse = await response.json();

            if (parseResponse.token) {
                localStorage.setItem("token", parseResponse.token);
                setAuth(true);

                toaster.notify("Logged in Successfully!", {
                    duration: 900
                })
  
            } else {
                setAuth(false);

                toaster.notify(parseResponse, {
                    duration: 900
                })
            }
        }

        catch (err) {
            console.error(err.message);
        }
    }
    return (
        <>

            <div className="container">
                <h1>Welcome to login!</h1>

                <form onSubmit={handleSubmit} >
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input onChange={handleChange} value={email} type="text" name='email'
                            className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input onChange={handleChange} value={password} type="password" name='password'

                            className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>

                    <button type="submit" className="btn btn-block btn-success">Submit</button>
                    <small id="emailHelp" className="form-text text-muted mt-3">Don't have Account,Lets Create .</small>
                </form>
                <Link className="btn btn-primary mt-2 "  to="/register">Register</Link>
            </div>
        </>
    )
}

export default Login