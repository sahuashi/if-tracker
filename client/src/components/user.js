import React, { createContext } from "react";

const defaultState = {
    user_id: "",
    name: "",
    isAuthenticated: "",
    setUserID: () => {},
    setUsername: () => {},
    setAuthentication: () => {}
}

export const UserContext = createContext(defaultState);

export class UserProvider extends React.Component {
    setUserID = id => {
        this.setState({ user_id: id });
    };

    setUsername = username => {
        this.setState({ name: username });
    };

    setAuthentication = auth => {
        this.setState({ isAuthenticated: auth });
    };

    state = {
        user_id: "",
        name: "",
        isAuthenticated: false,
        setUserID: this.setUserID,
        setUsername: this.setUsername,
        setAuthentication: this.setAuthentication,
    };

  render(){
      return(
          <UserContext.Provider value={this.state}>
              {this.props.children}
          </UserContext.Provider>
      );
  }
}

export const UserConsumer = UserContext.Consumer;