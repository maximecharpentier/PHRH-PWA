import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { API } from '../../utils/api'

import { useAuth } from "../../contexts/AuthContext";


const Login = () => {
  const [nom, setNom] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { setAuthToken } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    API.post('auth/login/', {
      nom,
      pwd
    }).then((response) => {
      setAuthToken(response.data.token, response.data.user);
      setLoggedIn(true);
    }).catch(error => {
      setErrorMsg(error.response.data.msg)
    });
  }

  if (isLoggedIn) {
    return <Redirect to="/manage" />
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={nom || ''}
        name="nom"
        placeholder="Nom d'utilisateur"
        onChange={e => {
          setNom(e.target.value);
        }} />
      <input
        type="password"
        value={pwd || ''}
        name="pwd"
        placeholder="Mot de passe"
        onChange={e => {
          setPwd(e.target.value);
        }} />
      <button type="submit">Valider</button>
      {errorMsg !== "" ? <p>{errorMsg}</p> : ""}
    </form>
  )
}

export default Login