import React, { Component } from "react";
import Form from "../components/form.component";
import UserService from "../services/user.service";
import FormService from "../services/form.service";
import AuthService from "../services/auth.service";

export default class BoardDoctor extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.onClickPatient = this.onClickPatient.bind(this);
    this.onClickForm=this.onClickForm.bind(this);
    this.state = {
      id: this.props.id,
      content: undefined,
      contentReady: false,
      patients: [],
      patientsReady: false,
      forms: undefined,
      formsReady: false,
      pickedPatient: undefined,
      formPicked: undefined,
      filtered: [],
      modalActive: false,
      status: undefined
    };
  }

  onClickForm(e, id) {
    e.preventDefault()
    this.setState({
      formPicked:id,
      modalActive:true
    });
  }

  onChangeSearch = async (e) => {
    e.preventDefault()

    let convertToLc = e.target.value.toLowerCase()
    let filterData = this.state.patients.filter((el)=>{
      let nameToLc = el.firstName.toLowerCase()
      let lastNameToLc = el.lastName.toLowerCase()
      let surname = el.surname.toLowerCase()
      console.log(convertToLc)
      return (nameToLc.includes(convertToLc) || (lastNameToLc.includes(convertToLc)) || surname.includes(convertToLc))
    });
    console.log(filterData);
    this.setState({
      searchTerm: convertToLc,
      filtered: filterData,
      patientsReady: true
    });
  }

  onSearchClick() {
    this.setState({
      searchTerm: "",
      filtered: this.state.patients,
      pickedPatient: undefined,
      formPicked: undefined,
    })
  }


  hideModal(e) {
    this.setState({
      modalActive: false
    });
  }

  onClickPatient(id,e) {
    e.preventDefault()
    this.setState({
      forms: "",
      pickedPatient: id,
      formsReady: false
    });
    FormService.getForm(id).then(
      response => {
        this.setState({
          forms: response.data,
          formsReady: true
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


  componentDidMount() {
    let patientsArr = undefined
    UserService.getDocBoard(this.state.id).then(
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
    UserService.getPatientByDoc(this.state.id).then(
      response => {
        this.setState({
          patients: response.data,
          patientsReady:true,
          filtered: response.data
        });
        patientsArr = response.data
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
    
   
    if (this.state.patientsReady) {
      console.log(patientsArr)
      for (let patient of patientsArr) {
        UserService.getPatientStatus(patient.id).then(
          response => {
            patient.status = response.data
            console.log(patient)
          },
          error => {
            patient.status =
               ((error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString())
          }
        );
      }
    }
    
  }

  render() {
    const content = this.state.content
    const contentReady = this.state.contentReady
    const forms = this.state.forms
    const formsReady = this.state.formsReady
    return (
        <div className="Wrapper">
            <header className="Board-headContainer">
                <h3 className="Border-header">{contentReady && (content.lastName+ " " + content.firstName + " " + content.surname)}</h3>
                <a href="/login" onClick={AuthService.logout}>Выйти</a>
            </header>
            <main>
              <input type="text" 
              className="form-control" 
              placeholder="Поиск"
              value={this.state.searchTerm}
              onClick={this.onSearchClick}
              onChange={this.onChangeSearch}/>
                <ul className="Patient-list">
                  {this.state.patientsReady && (this.state.filtered.map((patient, index)=>{
                  return (
                    <div key={index}>
                      <li  className="App-list__element"  onClick={e=>this.onClickPatient(patient.patientId,e)
                      }>  
                        <div className="Patient-info">
                          <h3>{patient.lastName+" "+patient.firstName+" "+patient.surname} </h3>
                          <p>Состояние: {patient.status}</p>
                          {this.state.pickedPatient===patient.patientId && (
                            <div className="Patient-addinfo">
                              <p>{("Пол: " + (patient.male==="M" ? "Мужчина": "Женщина"))}</p>
                              <p>{("Дата рождения: " + patient.dateOfBirth.slice(0,-9))}</p>
                              <p>{("Контактный номер: " + patient.contactNumber)}</p>
                            </div>
                          )}                    
                        </div>
                        <hr></hr>
                        <div className="Patient-formlist">
                          <ul>
                            {
                              this.state.pickedPatient===patient.patientId && formsReady && (forms.reverse().map((form, fIndex)=>{
                   
                                return(
                                <div key={fIndex}>
                                  <li className="App-list__element" onClick={e=>this.onClickForm(e, form.formId)}>
                                    <h3>Анкета №{form.formId}</h3>
                                    <p>Дата прохождения: {form.completionDate.slice(0,-9)}</p>
                                  </li>
                                  
                                    {this.state.formPicked===form.formId && <Form className="Modal-content"
                                        formInfo={form}>
                                    </Form> }
                                    <hr></hr>
                                </div> )
                              }))
                            }
                          </ul>
                        </div>
                      </li> 
                    </div>
                    
                  );
                }))}
                </ul>
                
            </main>
        </div>
        

    );
  }
}

