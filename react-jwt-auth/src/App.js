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
      currentUser: undefined
    };
    
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
              <a href="/">Помощь</a>
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