//1) creer utilitaire

//A CALL WHEN LOGIN
auth(user, mdp) {
	//req sur /login
	//stocker le token en localstorage
	storeToken((string) token)
}

//A CALL WHEN LOGIN SUCCESS
storeToken((string) token) {
	//store token in LocalStorage	
}

//A APPELER A LA DECONNECTION
disconnect() {
	removeToken()
}

removeToken() {
	//remove token from localStorage
}

getToken() {
	//get token from local storage
}

//A APPELER AVANT CHAQUE REDIRECTION
isAuth() {
	//requette sur la route /isConnected()
	//si code 200 -> ok return true
	//si code 401 -> ko redirect to login page
}

//A APPELER POUR PEUPLER LA CLEF "header" lor de axios connect
getAuthHeaders() {
	//get token from local storage
	//return object formated {'Authorization': token}
}

//2) brancher test d'authentification sur APP.js
//APALER IS CONNECTED DANS APP

//3) Modifier API.js pour integrer headers

//4) Eventuelement modifier les call api ou l'interface api.js n'est pas utilisée

