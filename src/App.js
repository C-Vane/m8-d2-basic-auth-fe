import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import HomePage from "./components/pages/HomePage";
import NavBar from "./components/Navbar";
import { Button, Container } from "@material-ui/core";
function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/' component={(props) => <NavBar {...props} />} />
        <Switch>
          <Route exact path='/'>
            <Container>
              <h2>Welcome to user platform</h2>
              <div className='d-flex justify-content-center p-2 m-5'>
                <Link to='/logIn'>
                  <Button variant='outlined' color='primary' className='px-5 mr-5'>
                    Log In
                  </Button>
                </Link>
                <Link to='/signUp'>
                  <Button variant='outlined' className='px-5 ml-5'>
                    Sign up
                  </Button>
                </Link>
              </div>
            </Container>
          </Route>
          <Route exact path='/login' component={(props) => <LogIn {...props} />} />
          <Route exact path='/signUp' component={(props) => <SignUp {...props} />} />
          <Route exact path='/profile' component={(props) => <HomePage {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
