import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toaster from "toasted-notes";
const Register = ({ setAuth }) => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    // object destructuring 
    const { email, password } = values;

    // onChange Event Handler
    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }
    // Form submission control event 
    const handleSubmit = async e => {
        const body = { email, password }
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/users/register',
                {
                    method: 'POST', headers: { 'Content-Type': "application/json" },
                    body: JSON.stringify(body)
                });
            const parseResponse = await response.json();
            // console.log(parseResponse)

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
                <h1>Welcome to Registration!</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input onChange={handleChange} value={email} name='email'
                            type="text"
                            className="form-control"
                            novalidate="novalidate"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your
                         email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label
                            for="exampleInputPassword1">Password</label>
                        <input onChange={handleChange} value={password}
                            name='password'
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password" />
                    </div>
                    <button className=" btn btn-success btn-block" type="submit" >Register</button>
                </form>
                <small id="emailHelp" className="form-text text-muted mt-3">Already have Account,Lets Login.</small>
                <Link className="btn btn-primary mt-2 to=" to="/login">Login!</Link>
            </div>
        </>
    )
}
export default Register