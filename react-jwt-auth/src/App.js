import React, { Component } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from './img/logo.png'
import AuthService from "./services/auth.service";
import Home from "./components/home.component"
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      modalActive: false
    };
    
  }

  showModal(e) {
  
    this.setState({
      modalActive: true
    });
  }

  hideModal(e) {
    this.setState({
      modalActive: false
    });
  }


  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined
    });
  }

  render() {

    const {currentUser} = this.state;

    return (
      <div className="App">
        <header className="App-header">
        <div className="App-logo">
            <h1>Feel<span className="text_highlight">In</span></h1>
            <a href="/"><img src={logo} alt=""/></a>
            </div>
            <div>
            <button className="App-button" onClick={e=>this.showModal(e)}>Помощь</button>
              <div className={this.state.modalActive ? "Modal Active": "Modal"} onClick={e=>this.hideModal(e)}>
                  <div className="Modal-content" onClick={e=>e.stopPropagation()}>
                      {(currentUser!==undefined && currentUser.roles.includes("ROLE_DOCTOR")) && (
                        <div className="Help">
                          <p>
                            В личном кабинете вам доступен список ваших пациентов. 
                            Нажмите на пациента, чтобы раскрыть список анкет, заполненных этим пациентом. 
                            Нажмите на анкету, чтобы раскрыть её и посмотреть показатели пациента.
                          </p>
                          <p>
                            Вы можете воспользоваться строкой поиска, чтобы найти пациента по имени.
                            Нажмите на переключатель "Сортировка по состоянию", чтобы пациенты с более худшим состоянием были подняты в вверх списка.
                            Обратите внимание, пациенты с анкетами, вызывающими беспокойство, выделяются жёлтым.
                          </p>
                        </div>
                      )}
                      {(currentUser!==undefined && currentUser.roles.includes("ROLE_PATIENT")) && (
                        <div className="Help">
                          <p>
                            В личном кабинете вы можете заполнить анкету, которую увидит ваш лечащий врач. Для этого нажмите на кнопку "Пройти новую анкету".
                            Также вам доступны ранее пройденные анкеты, кликните на одну из них, чтобы увидеть отправленные данные.
                          </p>
                        </div>
                      )}
                  </div>
                </div>
            </div>
            
        </header>
        
        
        
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;