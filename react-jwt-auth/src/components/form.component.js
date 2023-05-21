import React, { Component } from "react";


export default class Form extends Component {
  constructor(props) {
    super(props);
    this.onClickZone = this.onClickZone.bind(this);

    this.state = {
      content: "",
      formInfo: this.props.formInfo
    };
  }

    onClickZone(e) {
        this.setState({
            active: false
        });
        this.forceUpdate();
    }

  render() {

    const formInfo = this.state.formInfo
    return (
      <div className="Form-info"> 
        <ul>
            <li>Давление: {formInfo.pressureHigh}/{formInfo.pressureLow}</li>
            <li>Пульс: {formInfo.pulse}</li>
            <li>Температура: {formInfo.temperature}</li>
            <li>Оценка сна: {formInfo.sleepQuality}</li>
            <li>Оценка состояния: {formInfo.generalState}</li>
        </ul>
      </div>
    );
  }
}