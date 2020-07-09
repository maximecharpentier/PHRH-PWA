import axios from 'axios';

axios.defaults.headers.common.Authorization = localStorage.getItem('token');

const API = axios.create({
<<<<<<< HEAD
  //baseURL: 'http://15.188.8.83:3001/',
  baseURL: 'http://localhost:3001/',
=======
  baseURL: 'http://35.180.28.237:3001/',
>>>>>>> 77727fd2070a0f5d6d331c9c279826de82bd70ed
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ?  token : '';
  return config;
});


const getItem = (route, setState, id) => {
  API.get(route + id).then((response) => {
    setState(response.data);
  });
};

const getItems = (route, setState, id) => {
  API.get(route).then((response) => {
    response.data.map(
      (emergencyTeam) =>
        emergencyTeam.equipe._id === id && setState(emergencyTeam)
    );
    //
  });
};

export { API, getItem, getItems };
