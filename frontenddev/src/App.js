import React,{Fragment,useState,useEffect} from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Register from './components/Register';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false)
const setAuth=(boolean)=>{
  setIsAuthenticated(boolean);
}
const isValid = async () => {
  try {
      const response = await fetch('http://localhost:5000/users/verify', {
          method: 'get', headers: { token: localStorage.token }
      });
      const parsedResponse = await response.json();
      parsedResponse===true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      // console.log(parsedResponse);
      // setUser(parsedResponse.user_email);
  }
  catch (err) {
      console.error(err.message);
  }
}

useEffect(() => {
  isValid();
},[])

  return (
    <Fragment>
<Router>

{/*  Routing Components  */}
        <div className="container">
          <Switch>
          <Route exact path='/homepage' render={()=>isAuthenticated?(<Homepage  setAuth={setAuth} />):(<Redirect to="/login" />)} />
            <Route exact path='/register' render={()=>!isAuthenticated?(<Register  setAuth={setAuth}/>):(<Redirect to="/login" />)} />
            <Route exact path='/' render={()=>!isAuthenticated?(<Login  setAuth={setAuth}/>):(<Redirect to="/homepage" />)} />
            <Route exact path='/login' render={()=>!isAuthenticated?(<Login  setAuth={setAuth}/>):(<Redirect to="/homepage" />)} />
  
          </Switch>
            
        </div>
          </Router>

    </Fragment>
  );
}
export default App;
