import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toaster from "toasted-notes";
const Homepage = ({ setAuth }) => {
    const [user, setUser] = useState('');
    const getUser = async () => {
        try {
            const response = await fetch('http://localhost:5000/homepage', {
                method: 'get', headers: { token: localStorage.token }
            });
            const parsedResponse = await response.json();
            // console.log(parsedResponse);
            setUser(parsedResponse.user_email);

        }
        catch (err) {
            console.error(err.message);

        }
    }
    useEffect(() => {
        getUser()
    },[])
    const handleLogout=(e)=>{
        e.preventDefault();
localStorage.removeItem('token');
     setAuth(false)
     toaster.notify("Logout Succesfully!", {
        duration: 900})
    }
    return (
        <>
            
    <div className="card border-primary mb-3" style={{maxWidth: "18rem"}}>
  <div className="card-header">Authenticated User:  <span style={{color: "green",fontWeight: "bold"}}>{user} </span> </div>
  <div className="card-body text-primary">
    <h5 className="card-title">Welcome to Home!</h5>
    <p className="card-text">This is Home page and you are authorized user</p>
  </div>
  </div>
            {/* <button >LogOUT</button> */}
            <Link onClick={handleLogout} className="btn btn-primary mt-2" to="/register">Logout</Link>
        </>
    )
}
export default Homepage