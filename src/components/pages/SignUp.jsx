import { Container, FormControlLabel, Paper, TextField, Checkbox, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState("");
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const base64usernameAndPW = btoa(userName + ":" + password); // encoding in base64
      const data = {
        firstName: name,
        lastName: lastName,
        password: password,
        role: admin ? "admin" : "user",
        username: userName,
      };
      console.log(data);

      const resp = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (resp.ok) {
        localStorage.setItem("base64", base64usernameAndPW);
        props.history.push("/profile");
      } else {
        const error = await resp.text();
        setError(error.includes("username") ? "Duplicated username, please try another username" : "Incorrect entry");
      }
    } catch (error) {
      setError("Incorrect entry");
    }
  };

  return (
    <Container maxWidth='md' style={{ minHeight: "100vh" }} className='pt-5'>
      <Paper elevation={3} className='mt-3 p-2 pt-5 d-flex flex-column  align-items-center' style={{ minHeight: "60vh" }}>
        <form autoComplete='off' onSubmit={signUp} onMouseDown={() => setError(false)}>
          <TextField className='m-3 col-md-5' variant='outlined' value={name} onChange={(e) => setName(e.target.value)} label='First Name' required />
          <TextField className='m-3 col-md-5' variant='outlined' value={lastName} onChange={(e) => setLastName(e.target.value)} label='Last Name' required />
          <TextField className='m-3 col-md-5' error={error.length > 0} helperText={error} variant='outlined' value={userName} onChange={(e) => setUserName(e.target.value)} label='Username' required />
          <TextField
            className='m-3 col-md-5'
            variant='outlined'
            error={error && !error.includes("username")}
            helperText={error && !error.includes("username")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            type='password'
            required
          />
          <FormControlLabel className='m-3 col-md-5' control={<Checkbox checked={admin} onChange={() => setAdmin(!admin)} name='checkedH' />} label='Admin' />
          <Button variant='contained' className='m-3' type='submit' color='primary'>
            Sign Up
          </Button>
        </form>
        <small>
          <Link to='/logIn'>Log In</Link>
        </small>
      </Paper>
    </Container>
  );
};

export default withRouter(SignUp);
