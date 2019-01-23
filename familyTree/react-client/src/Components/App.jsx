import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import TreeDisplay from "./TreeDisplay";
import Octicon, {Person} from '@githubprimer/octicons-react'
import Auth from '../Auth/Auth';
import history from '../history';
import Login from "./Login";

const auth = new Auth();

const Home = (props) => < Dashboard function={loadText} auth={auth} {...props} />;
const LoginHere = (props) => <Login auth={auth} {...props} />;
const View = (props) => {handleAuthentication(props); return <TreeDisplay {...props} />};

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

function loadText() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("user-name").innerHTML =
      "Hello, User!";
    }
  };
  xhttp.open("GET", "ajax_info.txt", true);
  xhttp.send();
}

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link class="navbar-brand" to="/">JAMZ</Link>
            <ul class="navbar-nav mr-auto">
              <li class="nav-item"><Link to="/">About</Link></li>
              <li class="nav-item"><Link to="/view/">View</Link></li>
            </ul>
            <p class="user" id="user-name">Please login!</p>
            <div class="user">
              <Octicon icon={Person} />
            </div>
          </nav>
          <Route path="/" component={Home} />
          <Route path="/login" component={LoginHere} />
          <Route path="/view/" component={View} />
          {/* "Routes" should change but cannot because of issues with the way authentication works with routing. */}
        </div>
      </Router>
    );
  }
}
export default App;
