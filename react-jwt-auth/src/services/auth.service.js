import axios from "axios";

const API_URL = "https://feelinbackend.onrender.com/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username,
     password, role, firstName, lastName, surname,
     contactNumber,polyclinicId, male, dateOfBirth,
     cabinetNumber, specialization) {
    return axios.post(API_URL + "signup", {
      username,
      password,
      role,
      firstName,
      lastName,
      surname,
      contactNumber,
      polyclinicId,
      male,
      dateOfBirth,
      cabinetNumber,
      specialization
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();