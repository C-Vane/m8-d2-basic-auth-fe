import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LogIn from "./components/pages/LogIn";
import SignUp from "./components/pages/SignUp";
import HomePage from "./components/pages/HomePage";
import NavBar from "./components/Navbar";
function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/' component={(props) => <NavBar {...props} />} />
        <Switch>
          <Route exact path='/login' component={(props) => <LogIn {...props} />} />
          <Route exact path='/signUp' component={(props) => <SignUp {...props} />} />
          <Route exact path='/profile' component={(props) => <HomePage {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
