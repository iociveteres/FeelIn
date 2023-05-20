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
        <div>
            <h3>Давление: {formInfo.pressureHigh}/{formInfo.pressureLow}</h3>
            <h3>Пульс: {formInfo.pulse}</h3>
            <h3>Температура: {formInfo.temperature}</h3>
            <h3>Оценка сна: {formInfo.sleepQuality}</h3>
            <h3>Оценка состояния: {formInfo.generalState}</h3>
        </div>
      </div>
    );
  }
}