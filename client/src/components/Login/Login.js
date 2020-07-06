import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { API } from '../../utils/api'
import { useAuth } from '../../contexts/AuthContext'
import './Login.scss'
import Logo from '../../assets/logo'


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
    <div className="Login">
      <Logo />
      <div className="Login__container">
        <form className="Login__form" onSubmit={(e) => handleSubmit(e)}>
          <h2 className="Login__title">Connexion</h2>
          <p className="Login__subtitle">Pour continuer, connectez-vous.</p>
          <label className="Login__label">Email</label>
          <input
            className="Login__input"
            type="text"
            value={nom || ''}
            name="nom"
            placeholder="Nom d'utilisateur"
            onChange={e => {
              setNom(e.target.value);
            }}
          />
          <label className="Login__label">Mot de passe</label>
          <input
            className="Login__input"
            type="password"
            value={pwd || ''}
            name="pwd"
            placeholder="Mot de passe"
            onChange={e => {
              setPwd(e.target.value);
            }} />
          <button className="Login__button" type="submit">Se connecter</button>
          {errorMsg !== "" ? <p className="Login__error">{errorMsg}</p> : ""}
        </form>
      </div>
    </div>
  )
}

export default Login