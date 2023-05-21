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
            <p>Feel<span className="text_highlight">In</span> - Информационная система для анкетирования пациентов о самочувствии, 
              предназначеная для использования участковыми и лечащими врачами, и их пациентами.
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
                    Регистрация
                </Link>
                </div>

            </div>
        </main>
    );
  }
}