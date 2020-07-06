//1) creer utilitaire
import {API} from '../utils/api'
// WHEN LOGIN SUCCESS
const storeToken = (token) => {
  //store token in LocalStorage
  window.localStorage.setItem('login_token', token);
}

const getToken = () => {
  // get token value from localStorage
  window.localStorage.getItem('login_token');
}

// WHEN USER DISCONNECT
const removeToken = () => {
  // remove token from localStorage
  window.localStorage.removeItem('login_token');
}



//A APPELER AVANT CHAQUE REDIRECTION
const isAuth = () => {
	//requette sur la route /isConnected()
	//si code 200 -> ok return true
  //si code 401 -> ko redirect to login page
  API.get('users/').then((response) => {
    if(response.status === 200) {
      return true;
    }
    if(response.status === 401) {
      return false;
    }
  })
}

//A APPELER POUR PEUPLER LA CLEF "header" lor de axios connect
const getAuthHeaders = () => {
  Authorization: getToken()
}

console.log(getAuthHeaders())

//2) brancher test d'authentification sur APP.js
//APALER IS CONNECTED DANS APP

//3) Modifier API.js pour integrer headers

//4) Eventuelement modifier les call api ou l'interface api.js n'est pas utilisée

export {isAuth};

