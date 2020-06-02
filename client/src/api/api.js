import axios from 'axios';


const API = axios.create({
  baseURL: `http://localhost:27017/`
});

const getUser = (id, setState) => {  
  API.get("/users/get/" + id).then((response) => {
    setState(response.data)
  })
}

export {API, getUser}