import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Menu, Container, Dropdown, Image} from "semantic-ui-react";
import RegisterUser from "./components/registeruser";
import LoginUser from "./components/loginuser";
import MyFasts from "./components/myfasts";
import AddFast from "./components/addfast";
import EditFast from "./components/editfast";
import LogoutUser from "./components/logoutuser";
import "bootstrap/dist/css/bootstrap.min.css";
import 'semantic-ui-css/semantic.min.css'

function App() {
  
  var storeduser = window.localStorage.getItem("user");

  const [user, setUser] = useState(() => {
    return storeduser !== null ? JSON.parse(storeduser) : { id: '', isLoggedIn: false }
  });

  useEffect(() => { window.localStorage.setItem("user", JSON.stringify(user)) }, [user]);

  return (
    <Router>
      <Menu borderless>
        <Container text>
          <Menu.Item><Image size='mini'/></Menu.Item>
          <Menu.Item header>SixteenAte: Fasting Tracker</Menu.Item>
          <Menu.Item as={Link} name='home' to="/">Home</Menu.Item>
          <Menu.Item as={Link} name='fasts' to="/fasts/">My Fasts</Menu.Item>
          {user.isLoggedIn && <Menu.Item as={Link} name='addfast' to="/fasts/add">Add Fast</Menu.Item>}
          <Menu.Menu position='right'>
            <Dropdown text='Account' pointing className='link item'>
              <Dropdown.Menu>
              {!user.isLoggedIn && <Dropdown.Item as={Link} name='register' to="/user/signup">Register</Dropdown.Item>}
              {!user.isLoggedIn && <Dropdown.Item as={Link} name='login' to="/user/login">Login</Dropdown.Item>}
              {user.isLoggedIn && <Dropdown.Item as={Link} name='logout' to="/user/logout">Logout</Dropdown.Item>}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>
      <Route path="/user/signup" render={(props) => <RegisterUser {...props} user={user} onChange={setUser}/>} />
      <Route path="/user/login" render={(props) => <LoginUser {...props} user={user} onChange={setUser}/>} />
      <Route exact path="/fasts/" render={(props) => <MyFasts {...props} user={user} onChange={setUser}/>} />
      <Route exact path="/fasts/add" render={(props) => <AddFast {...props} user={user} onChange={setUser}/>} />
      <Route exact path="/fasts/edit/:id" render={(props) => <EditFast {...props} user={user} onChange={setUser}/>} />
      <Route path="/user/logout" render={(props) => <LogoutUser {...props} user={user} onChange={setUser}/>} />
    </Router>
  );
}

export default App;
