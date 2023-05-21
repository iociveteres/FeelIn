import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://feelinbackend.onrender.com/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getDocBoard(id) {
    return axios.get(API_URL + 'doctor/'+id, { headers: authHeader() });
  }

  getPatientBoard(id) {
    return axios.get(API_URL + 'patient/'+id, { headers: authHeader() });
  }

  getPatientStatus(id) {
    return axios.get(API_URL + 'status/'+id, { headers: authHeader() });
  }

  getPatientByDoc(id) {
    return axios.get(API_URL + 'patient/byDocId/'+id, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();