import React, { useState, useEffect } from 'react';

import { IoLeafSharp } from 'react-icons/io5';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {
  Icon, Segment, Menu, Sidebar, Container,
} from 'semantic-ui-react';

import AddFast from './components/fasts/AddFast';
import EditFast from './components/fasts/EditFast';
import MyFasts from './components/fasts/MyFasts';
import LoginUser from './components/user/LoginUser';
import LogoutUser from './components/user/LogoutUser';
import RegisterUser from './components/user/RegisterUser';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  const storeduser = window.sessionStorage.getItem('user');

  const [user, setUser] = useState(() => (storeduser !== null ? JSON.parse(storeduser) : { id: '', isLoggedIn: false }));

  useEffect(() => { window.sessionStorage.setItem('user', JSON.stringify(user)); }, [user]);

  return (
    <Router>
      <Container fluid>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            vertical
            secondary
            visible
            width="thin"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            id="sidebar"
          >
            <IoLeafSharp size="2em" color="green" />
            <Menu.Item header>SixteenAte</Menu.Item>
            <Menu.Item as={Link} to="/" id="navitem">
              <Icon name="stopwatch" />
              My Fasts
            </Menu.Item>
            {!user.isLoggedIn && (
            <Menu.Item as={Link} to="/login" id="navitem">
              <Icon name="user" />
              Login
            </Menu.Item>
            )}
            {user.isLoggedIn && (
            <Menu.Item as={Link} to="/logout" id="navitem">
              <Icon name="user outline" />
              Logout
            </Menu.Item>
            )}
          </Sidebar>
          <Sidebar.Pusher>
            <Segment style={{ paddingTop: 0, paddingBottom: 0 }}>
              <Route path="/signup" render={(props) => <RegisterUser {...props} user={user} onChange={setUser} />} />
              <Route path="/login" render={(props) => <LoginUser {...props} user={user} onChange={setUser} />} />
              <Route exact path="/" render={(props) => <MyFasts {...props} user={user} onChange={setUser} />} />
              <Route exact path="/add" render={(props) => <AddFast {...props} user={user} onChange={setUser} />} />
              <Route exact path="/edit/:id" render={(props) => <EditFast {...props} user={user} onChange={setUser} />} />
              <Route path="/logout" render={(props) => <LogoutUser {...props} user={user} onChange={setUser} />} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    </Router>
  );
}

export default App;
