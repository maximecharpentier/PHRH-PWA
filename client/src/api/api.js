import axios from 'axios';


const API = axios.create({
  baseURL: `http://localhost:27017/`
});

const getItem = (id, route, setState) => {  
  API.get(route + id).then((response) => {
    setState(response.data)
  })
}

export {API, getItem}