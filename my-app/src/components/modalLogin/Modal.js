import './Modal.css';
import React from 'react';

function Modal({active, setActive}) {
    return (
        <div className={active ? "App-modal active" : "App-modal"} onClick={()=>setActive(false)}>
            <div className={active ? "ModalLogin__content active" : "ModalLogin__content"} onClick={e => e.stopPropagation()}>
                <form className="Modal-form">
                    <label className = "ModalLogin__label">
                    Логин
                    <input
                        name="login"/>
                    </label>
                    <br />
                    <label className ="ModalLogin__label">
                    Пароль
                    <input
                        name="pass"
                        type="password"/>
                    </label>
                    <a href="/">Забыли пароль?</a>
                </form>
                <button className = "App-button" onClick={(true)}>Войти</button>
            </div>
        </div>
    );
};



export default Modal;