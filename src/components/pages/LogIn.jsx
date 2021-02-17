import { Container, Paper, TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
const LogIn = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const logIn = async (e) => {
    e.preventDefault();
    try {
      const base64usernameAndPW = btoa(userName + ":" + password); // encoding in base64
      const resp = await fetch("http://localhost:3001/users/me", {
        headers: {
          Authorization: "Basic " + base64usernameAndPW,
        },
      });

      if (resp.ok) {
        localStorage.setItem("base64", base64usernameAndPW);
        props.history.push("/profile");
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <Container maxWidth='md' style={{ minHeight: "100vh" }} className='pt-5'>
      <Paper elevation={3} className='mt-3 p-2 pt-5 d-flex flex-column align-items-center' style={{ minHeight: "60vh" }}>
        <form onSubmit={logIn} onMouseDown={() => setError(false)}>
          <TextField
            className='m-3 col-md-5'
            variant='outlined'
            error={error}
            helperText={error ? "Incorrect entry." : ""}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            label='Username'
            required
          />
          <TextField
            className='m-3 col-md-5'
            variant='outlined'
            error={error}
            helperText={error ? "Incorrect entry." : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            type='password'
            required
          />
          <Button variant='contained' className='m-3' type='submit' color='primary'>
            Log In
          </Button>
        </form>
        <small>
          <Link to='/signUp'>Sign Up</Link>
        </small>
      </Paper>
    </Container>
  );
};

export default withRouter(LogIn);
