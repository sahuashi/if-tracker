import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterUser from "./components/registeruser";
import LoginUser from "./components/loginuser";
import MyFasts from "./components/myfasts";
import AddFast from "./components/addfast";
import EditFast from "./components/editfast";
import LogoutUser from "./components/logoutuser";

function App() {
  
  var storeduser = window.sessionStorage.getItem("user");

  const [user, setUser] = useState(() => {
    return storeduser !== null ? JSON.parse(storeduser) : { id: '', isLoggedIn: false }
  });

  useEffect(() => { window.sessionStorage.setItem("user", JSON.stringify(user)) }, [user]);

  return (
    <Router>
      <Container fluid>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>SixteenAte: Fasting Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="nav-link" to="/" >Home</Link>
            <Link className="nav-link" to="/fasts/" >My Fasts</Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              {!user.isLoggedIn && <Link className="nav-link" to="/user/signup">Register User</Link>}
              {!user.isLoggedIn && <Link className="nav-link" to="/user/login">Login User</Link>}
              {user.isLoggedIn && <Link className="nav-link" to="/user/logout">Logout User</Link>}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route path="/user/signup" render={(props) => <RegisterUser {...props} user={user} onChange={setUser}/>} />
      <Route path="/user/login" render={(props) => <LoginUser {...props} user={user} onChange={setUser}/>} />
      <Route exact path="/fasts/" render={(props) => <MyFasts {...props} user={user} onChange={setUser}/>} />
      <Route exact path="/fasts/add" render={(props) => <AddFast {...props} user={user} onChange={setUser}/>} />
      <Route exact path="/fasts/edit/:id" render={(props) => <EditFast {...props} user={user} onChange={setUser}/>} />
      <Route path="/user/logout" render={(props) => <LogoutUser {...props} user={user} onChange={setUser}/>} />
      </Container>
    </Router>
  );
}

export default App;
