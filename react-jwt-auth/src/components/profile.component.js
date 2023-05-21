import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import BoardPatient from "./board-patient.component";
import BoardDoctor from "./board-doctor.component";
export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
          {currentUser.roles.includes("ROLE_PATIENT") &&
            (<BoardPatient id={currentUser.id}></BoardPatient>)}
          {currentUser.roles.includes("ROLE_DOCTOR") &&
            (<BoardDoctor id={currentUser.id}></BoardDoctor>)}  
      </div>: null}
      </div>
    );
  }
}