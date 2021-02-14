import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterUser from "./components/registeruser";
import LoginUser from "./components/loginuser";
import MyFasts from "./components/myfasts";
import AddFast from "./components/addfast";
import LogoutUser from "./components/logoutuser";

function App() {

  const [user, setUser] = useState({
    id: '',
    isLoggedIn: false,
  });

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">SixteenAte: Fasting Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {!user.isLoggedIn && <Link className="nav-link" to="/user/signup">Register User</Link>}
            {!user.isLoggedIn && <Link className="nav-link" to="/user/login">Login User</Link>}
            {user.isLoggedIn && <Link className="nav-link" to="/user/logout">Logout User</Link>}
            <Link className="nav-link" to="/fasts/" >My Fasts</Link>
            {user.isLoggedIn && <Link className="nav-link" to="/fasts/add">Add Fast</Link>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route path="/user/signup" render={(props) => <RegisterUser {...props} user={user} onChange={setUser}/>} />
      <Route path="/user/login" render={(props) => <LoginUser {...props} user={user} onChange={setUser}/>} />
      <Route exact path="/fasts/" render={(props) => <MyFasts {...props} user={user} onChange={setUser}/>} />
      <Route path="/fasts/add" render={(props) => <AddFast {...props} user={user} />} onChange={setUser}/>
      <Route path="/user/logout" render={(props) => <LogoutUser {...props} user={user} onChange={setUser}/>} />
    </Router>
  );
}

export default App;
