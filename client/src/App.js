import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterUser from "./components/registeruser";
import LoginUser from "./components/loginuser";
import MyFasts from "./components/myfasts";
import AddFast from "./components/addfast";
import LogoutUser from "./components/logoutuser";
import { UserProvider } from "./components/user";

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">SixteenAte: Fasting Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/user/signup">Register User</Link>
            <Link className="nav-link" to="/user/login">Login User</Link>
            <Link className="nav-link" to="/user/logout">Logout User</Link>
            <Link className="nav-link" to="/fasts/" >My Fasts</Link>
            <Link className="nav-link" to="/fasts/add">Add Fast</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <UserProvider>
      <Route path="/user/signup" component={RegisterUser} />
      <Route path="/user/login" component={LoginUser} />
      <Route exact path="/fasts/" component={MyFasts} />
      <Route path="/fasts/add" component={AddFast} />
      <Route path="/user/logout" component={LogoutUser} />
      </UserProvider>
    </Router>
  );
}

export default App;
