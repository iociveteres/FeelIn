import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import FormService from "../services/form.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Это поле обязательно!
      </div>
    );
  }
};


export default class FormSend extends Component {
  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
    this.onChangePressHigh = this.onChangePressHigh.bind(this);
    this.onChangePressLow = this.onChangePressLow.bind(this);
    this.onChangeTemp = this.onChangeTemp.bind(this);
    this.onChangeSQ = this.onChangeSQ.bind(this);
    this.onChangeGS = this.onChangeGS.bind(this);
    this.onChangePulse = this.onChangePulse.bind(this);

    this.state = {
      message: "",
      successful: false,
      pressureHigh:undefined,
      pressureLow:undefined,
      temperature:undefined,
      pulse:undefined,
      generalState:undefined,
      sleepQuality:undefined,
      patientId: this.props.id,
    };
  }

  onChangePressHigh(e) {
    this.setState({
      pressureHigh: e.target.value
    });
  }

  onChangePressLow(e) {
    this.setState({
      pressureLow: e.target.value
    });
  }

  onChangeTemp(e) {
    this.setState({
      temperature: e.target.value
    });
  }


  onChangeSQ(e) {
    this.setState({
       sleepQuality: e.target.value 
    });
  }

  onChangeGS(e) {
    this.setState({
       generalState: e.target.value 
    });
  }

  onChangePulse(e) {
    this.setState({
       pulse: e.target.value 
    });
  }

  handleSend(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();
    let date = new Date()

    if (this.checkBtn.context._errors.length === 0) {
      FormService.postForm(
        this.state.patientId,
        this.state.pressureHigh,
        this.state.pressureLow,
        this.state.pulse,
        this.state.temperature,
        this.state.sleepQuality,
        this.state.generalState,
        date
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className={"Wrapper"}>
        <div className={"App-form"}>
          <Form
            onSubmit={this.handleSend}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                
                <div className="form-group">
                  <label htmlFor="pressHigh"><span>Верхнее давление<span className="imp">*</span></span></label>
                  <Input
                    type="number"
                    className="form-control"
                    name="pressHigh"
                    min="0"
                    value={this.state.pressureHigh}
                    onChange={this.onChangePressHigh}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pressLow"><span>Нижнее давление<span className="imp">*</span></span></label>
                  <Input
                    type="number"
                    className="form-control"
                    name="pressLow"
                    min="0"
                    value={this.state.pressureLow}
                    onChange={this.onChangePressLow}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="pulse"><span>Пульс<span className="imp">*</span></span></label>
                  <Input
                    type="number"
                    className="form-control"
                    name="pulse"
                    min="0"
                    value={this.state.pulse}
                    onChange={this.onChangePulse}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="temperature"><span>Температура<span className="imp">*</span></span></label>
                  <Input
                    type="text"
                    className="form-control"
                    name="temperature"
                    inputtype="numeric"
                    pattern="^[3-4][0-9].[0-9]$"
                    placeholder="Например, 36.6"
                    value={this.state.temperature}
                    onChange={this.onChangeTemp}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="sleepQuality"><span>Оценка сна (0-10)<span className="imp">*</span></span></label>
                  <Input
                    type="number"
                    className="form-control"
                    name="sleepQuality"
                    value={this.state.sleepQuality}
                    onChange={this.onChangeSQ}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="generalState"><span>Оценка состояния (0-10)<span className="imp">*</span></span></label>
                  <Input
                    type="number"
                    className="form-control"
                    name="generalState"
                    value={this.state.generalState}
                    onChange={this.onChangeGS}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="App-button btn btn-primary">Отправить анкету</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}