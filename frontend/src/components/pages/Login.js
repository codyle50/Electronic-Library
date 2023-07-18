import Form from 'react-bootstrap/Form';
import '../css/form.css';
import React, {useEffect, useContext, useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import AuthContext from '../context/AuthContext';


function Login() {
  let { loginUser } = useContext(AuthContext)
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  
  useEffect(()=>{
    document.title ="LogIn | Library"
  }, [])

  return (
    <div className='form-cover'>
      <Form className='form-page login-form' method='post' onSubmit={loginUser}>
      <h1>Login Form</h1>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Your username</Form.Label>
        <Form.Control type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
          name='username' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          name='password' />
      </Form.Group>
      <div className='buttonDiv'>
      <Nav.Link href="/forgot-password">Forgot password?</Nav.Link>
        <button className='btn darkButton' type="submit">
          Log In
        </button>
      </div>
    </Form>
    </div>
  );
}

export default Login;