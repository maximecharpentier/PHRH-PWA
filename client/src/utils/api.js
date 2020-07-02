import axios from 'axios';

const API = axios.create({
  baseURL: 'http://52.47.86.14:3001/'
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
