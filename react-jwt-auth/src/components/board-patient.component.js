import React, { Component } from "react";
import Form from "../components/form.component";
import FormSend from "../components/form-send.component";
import UserService from "../services/user.service";
import FormService from "../services/form.service";
import AuthService from "../services/auth.service";

export default class BoardPatient extends Component {
  constructor(props) {
    super(props);
    this.onClickForm=this.onClickForm.bind(this);
    this.state = {
      id: this.props.id,
      content: undefined,
      forms: undefined,
      contentReady: false,
      formReady: false,
      formPicked: undefined,
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

  onClickForm(e, id) {
    e.preventDefault()
    this.setState({
      formPicked:id
    });
  }


  componentDidMount() {
    UserService.getPatientBoard(this.state.id).then(
      response => {
        this.setState({
          content: response.data,
          contentReady:true
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    FormService.getForm(this.state.id).then(
      response => {
        this.setState({
          forms: response.data,
          formReady: true
        });
      },
      error => {
        this.setState({
          forms:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );  
  }

  render() {
    const content = this.state.content
    const contentReady = this.state.contentReady
    const forms = this.state.forms
    const formReady = this.state.formReady
    return (
        <div className="Wrapper">
            <header className="Board-headContainer">
                <h3 className="Border-header">{contentReady && (content.lastName+ " " + content.firstName + " " + content.surname)}</h3>
                <a href="/login" onClick={AuthService.logout}>Выйти</a>
            </header>
            <main>
                <button className="App-button" onClick={e=>this.showModal(e)}>Пройти новую анкету</button>
                {this.state.modalActive && 
                <div className={this.state.modalActive ? "Modal Active": "Modal"} onClick={e=>this.hideModal(e)}>
                  <div className="Modal-content" onClick={e=>e.stopPropagation()}>
                    <FormSend id={this.props.id} ></FormSend>
                  </div>
                  
                </div>}
                
                <ul>{formReady && (forms.map((form, index)=>{
                  console.log(form)
                  return (
                    <div key={index}>
                      <li className="App-list__element" onClick={e=>this.onClickForm(e, form.formId)} >
                        <h3>Анкета №{index+1}</h3>
                        <p>Дата прохождения: {form.completionDate.slice(0,-9)}</p>
                      </li> 
                      {this.state.formPicked===form.formId && 
                      <Form formInfo={form}></Form>}
                    </div>
                    
                  );
                }))}
                </ul>
                
            </main>
        </div>
        

    );
  }
}

