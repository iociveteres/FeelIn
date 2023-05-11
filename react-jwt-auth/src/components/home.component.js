import React, { Component } from "react";
import {Link} from "react-router-dom";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
        <main className="AppMain">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore 
            magna aliqua. Ut enim ad minim veniam, quis nostrud 
            </p>
            <div className="App-enter">
                <div className="Wrapper" >
                <h2>Вход</h2>
                </div>
                <div className="Wrapper" >
                <Link to={"/login"} className="App-button">
                    Вход
                </Link>
                <Link to={"/register"} className="App-button">
                    Зарегистрироваться
                </Link>
                </div>

            </div>
        </main>
    );
  }
}