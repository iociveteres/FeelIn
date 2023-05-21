import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://feelinbackend.onrender.com/form/';

class FormService {
  getForm(id) {
    return axios.get(API_URL + id, {headers: authHeader()});
  }

  postForm(patientId, pressureHigh, pressureLow, pulse,
    temperature, sleepQuality, generalState, completionDate) {
    return axios.post(API_URL + 'addForm', {patientId,pressureHigh,pressureLow, pulse, temperature,
      sleepQuality, generalState, completionDate}, { headers: authHeader()}
    );
  }
}

export default new FormService();