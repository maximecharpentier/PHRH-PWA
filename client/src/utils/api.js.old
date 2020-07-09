import axios from 'axios';

axios.defaults.headers.common.Authorization = localStorage.getItem('token');

const API = axios.create({
  baseURL: 'http://35.180.137.52:3001/',
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
