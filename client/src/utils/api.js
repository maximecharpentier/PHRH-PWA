import axios from 'axios';

const API = axios.create({
  baseURL: process.env.API_URL,
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
