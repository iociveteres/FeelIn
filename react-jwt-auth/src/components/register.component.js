import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Это поле обязательно!
      </div>
    );
  }
};



const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Имя пользователя должно быть более 3 и менее 20 символов.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Длина пароля должна быть более 6 и менее 40 символов.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeFirstname = this.onChangeFirstname.bind(this);
    this.onChangeLastname = this.onChangeLastname.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
    this.onChangeMale = this.onChangeMale.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeCabinetNumber = this.onChangeCabinetNumber.bind(this);
    this.onChangeSpecialization = this.onChangeSpecialization.bind(this);
    this.onChangePoly = this.onChangePoly.bind(this);

    this.state = {
      username: "",
      password: "",
      role:"patient",
      firstName: "",
      lastName: "",
      surname: "",
      contactNumber: "",
      polyclinicId: undefined,
      male:"M",
      dateOfBirth:null,
      cabinetNumber:null,
      specialization:null,
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePoly(e) {
    this.setState({
      polyclinicId: e.target.value
    });
  }

 
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeRole(e) {
    this.setState({
       role: e.target.value 
    });
    if (this.state.role === "doctor") {
        this.setState({
            male: null,
            dateOfBirth : null
          });
    }
    else if (this.state.role === "patient") {
        this.setState({
            male: "M",
            cabinetNumber: null,
            specialization : null
          });
    }
    this.forceUpdate();
  }

  onChangeFirstname(e) {
    this.setState({
       firstName: e.target.value 
    });
  }

  onChangeLastname(e) {
    this.setState({
       lastName: e.target.value 
    });
  }

  onChangeSurname(e) {
    this.setState({
       surname: e.target.value 
    });
  }

  onChangeMale(e) {
    this.setState({
       male: e.target.value 
    });
  }

  onChangeDateOfBirth(e) {
    this.setState({
       dateOfBirth: e.target.value 
    });
  }

  onChangeContactNumber(e) {
    this.setState({
       contactNumber: e.target.value 
    });
  }

  onChangeCabinetNumber(e) {
    this.setState({
       cabinetNumber: e.target.value 
    });
  }

  onChangeSpecialization(e) {
    this.setState({
       specialization: e.target.value 
    });
    
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.password,
        ["user", this.state.role],
        this.state.firstName,
        this.state.lastName,
        this.state.surname,
        this.state.contactNumber,
        this.state.polyclinicId,
        this.state.male,
        this.state.dateOfBirth===null? null: new Date(this.state.dateOfBirth),
        this.state.cabinetNumber,
        this.state.specialization
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
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
      <div className="Wrapper Centered">
        <div className="App-form">

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div className="Grid">
                <div>
                  <div className="form-group">
                    <label htmlFor="username"><span>Логин<span className="imp">*</span></span></label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>


                  <div className="form-group">
                    <label htmlFor="password"><span>Пароль<span className="imp">*</span></span></label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>
                </div>

                <div>
                  <div className="form-group">
                    <label htmlFor="lastName"><span>Фамилия<span className="imp">*</span></span></label>
                    <Input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.onChangeLastname}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="firstName"><span>Имя<span className="imp">*</span></span></label>
                    <Input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onChangeFirstname}
                      validations={[required]}
                    />
                  </div>

                  
                  <div className="form-group">
                    <label htmlFor="surname">Отчество</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="surname"
                      value={this.state.surname}
                      onChange={this.onChangeSurname}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contactNumber"><span>Контактный номер<span className="imp">*</span></span></label>
                    <Input
                      type="text"
                      className="form-control"
                      name="contactNumber"
                      value={this.state.contactNumber}
                      onChange={this.onChangeContactNumber}
                      validations={[required]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="polyclinicId"><span>№ поликлиники<span className="imp">*</span></span></label>
                    <Input
                      type="number"
                      className="form-control"
                      name="polyclinicId"
                      value={this.state.polyclinicId}
                      onChange={this.onChangePoly}
                      validations={[required]}
                    />
                  </div>

                </div>
                
                <div>
                  <div className="form-group">
                    <label htmlFor="role">Доктор/Пациент</label>
                    <select className ="form-control" 
                          value={this.state.role} 
                          onChange={this.onChangeRole}
                          name="role">
                      <option value="doctor">Доктор</option>
                      <option value="patient">Пациент</option>
                  </select>
                  </div>
                  {this.state.role === "patient" &&
                      (<div className="form-group">
                      <label htmlFor="male">Пол</label>
                      <select className ="form-control" 
                          value={this.state.male} 
                          onChange={this.onChangeMale}
                          name="male">
                      <option value="M">Мужчина</option>
                      <option value="F">Женщина</option>
                  </select>
                    </div> 
                    )
                  }
                  
                  {this.state.role === "patient" &&
                      (<div className="form-group">
                      <label htmlFor="dateOfBirth">Дата рождения</label>
                      <Input
                        type="date"
                        className="form-control"
                        name="dateOfBirth"
                        value={this.state.dateOfBirth}
                        onChange={this.onChangeDateOfBirth}
                        validations={[required]}
                      />
                    </div>
                    )
                  }

                  {this.state.role === "doctor" &&
                      (<div className="form-group">
                      <label htmlFor="cabinetNumber">Кабинет<span className="imp">*</span></label>
                      <Input
                        type="text"
                        className="form-control"
                        name="cabinetNumber"
                        value={this.state.cabinetNumber}
                        onChange={this.onChangeCabinetNumber}
                        validations={[required]}
                      />
                    </div>
                    )
                  }
                  
                  {this.state.role === "doctor" &&
                      (<div className="form-group">
                      <label htmlFor="specialization">Специализация<span className="imp">*</span></label>
                      <Input
                        type="text"
                        className="form-control"
                        name="specialization"
                        value={this.state.specialization}
                        onChange={this.onChangeSpecialization}
                        validations={[required]}
                      />
                    </div>
                    )
                  }
                </div>
                
                
                <div className="form-group lastGR">
                  <button type="submit" className="App-button btn btn-primary">Зарегистрироваться</button>
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
          <a href="/login">Войти</a>
        </div>
      </div>
    );
  }
}