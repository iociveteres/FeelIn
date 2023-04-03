import Modal from "./components/modalLogin/Modal";
import React from 'react';
import './App.css'
import logo from './img/logo.png'
import patient from './img/patient.png'
import doc from './img/health_worker.png'

function App() {
  const [modalActive, setModalActive] = React.useState(false)
  return (
    <div className="App">
      
      <header className="App-header">
        <div className="App-logo">
            <h1>Feel<span className="text_highlight">In</span></h1>
            <img src={logo} alt=""/>
        </div>
        <a href="/">Помощь</a>
      </header>
      <main className="App-main">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore 
          magna aliqua. Ut enim ad minim veniam, quis nostrud 
        </p>
        <div className="App-enter">
          <div className="Wrapper" >
            <h2>Вход</h2>
          </div>
          <div className="Wrapper" >
            <button className = "App-button" onClick={()=>setModalActive(true)}>
              Для врача <img className = "Button-image" src={doc} alt=""/>
            </button>
            <button className = "App-button" onClick={()=>setModalActive(true)}>
              Для пациента <img className = "Button-image" src={patient} alt=""/>
              </button>
          </div>
          <div className="Wrapper" >
            <a href="/">Регистрация</a>
          </div>
        </div>
        <Modal active={modalActive} setActive={setModalActive}/>  
      </main>
      
    </div>
  );
}

export default App;
