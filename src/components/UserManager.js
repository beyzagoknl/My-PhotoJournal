import React from "react";
import AppContext from "./AppContext";
import "./master.css";

class UserManager extends React.Component {
  static contextType = AppContext;

  componentDidMount() {
    console.log("UserManager.componentDidMount( )");

    let appContext = this.context;
    appContext.userManager = this;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("UserManager.componentDidUpdate( )");

    if (prevState.userId !== this.state.userId) {
      this.idChangeListeners.forEach((listener) => listener(this.state.userId));
    }
  }

  constructor(props) {
    super(props);

    this.idChangeListeners = [];

    this.state = {
      userid: "",
      userName: "",
      loggedIn: false,
      instructions: "Please log in to comment on photos.",
      userIdFieldValue: "",
      passwordFieldValue: "",
    };

    // these are necessary for "this" to point to this object
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.idChangeSubscribe = this.idChangeSubscribe.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleUserIdChange(event) {
    this.setState({ userIdFieldValue: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ passwordFieldValue: event.target.value });
  }

  idChangeSubscribe(listener) {
    console.log("UserManager.idChangeSubscribe()");
    this.idChangeListeners.push(listener);
    console.log(this.idChangeListeners);
  }

  logIn() {
    let userIdEntered = this.state.userIdFieldValue;
    let passwordEntered = this.state.passwordFieldValue;

    let successful = false;
    let userName = "unknown";

    if (
      userIdEntered.trim() === "harry" &&
      passwordEntered.trim() === "12345"
    ) {
      userName = "Harry Kong";
      successful = true;
    }

    if (
      userIdEntered.trim() === "jenny" &&
      passwordEntered.trim() === "12345"
    ) {
      userName = "Jenny Luz";
      successful = true;
    }

    if (successful) {
      this.setState(
        {
          loggedIn: true,
          userId: userIdEntered.trim(),
          userName: userName,
          instructions: "You can now comment on photos!",
        },
        () => {
          this.props.logInCallback(this.state);
        }
      );
    } else {
      this.setState({
        instructions: "Incorrect user ID or password. Try again.",
      });
    }
  }

  logOut() {
    this.setState({ instructions: "Please log in to comment on photos." });
    this.setState(
      {
        loggedIn: false,
        userId: "",
        userName: "",
        userIdFieldValue: "",
        passwordFieldValue: "",
      },
      () => {
        this.props.logInCallback(this.state);
      }
    );
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="user-manager-block user-manager-block-active-background">
          <p>
            Logged in as: {this.state.userName}&nbsp;
            <input
              className="button"
              type="button"
              value="Log Out"
              onClick={this.logOut}
            />
          </p>
          {this.props.showMessageArea(this.state)}
        </div>
      );
    } else {
      return (
        <div className="user-manager-block user-manager-block-inactive-background">
          <p>
            user ID:&nbsp;
            <input
              type="text"
              value={this.state.userIdFieldValue}
              onChange={this.handleUserIdChange}
            />
            &nbsp; password:&nbsp;
            <input
              type="text"
              value={this.state.passwordFieldValue}
              onChange={this.handlePasswordChange}
            />
            &nbsp;
            <input
              className="button"
              type="button"
              value="Log In"
              onClick={this.logIn}
            />
          </p>
          {this.props.showMessageArea(this.state)}
        </div>
      );
    }
  }
}

export default UserManager;
