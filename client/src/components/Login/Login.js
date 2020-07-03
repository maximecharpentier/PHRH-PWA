import React, { Component } from 'react'
import styled from 'styled-components';
import  { Redirect } from 'react-router-dom'
import {API} from '../../utils/api'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      nom: '',
      pwd: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleSubmit = () => {
    API.post('auth/login/', this.state).then((response) => {
      console.log(response.data)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }).catch(error => {
      console.log(error.response)
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          value={this.state.nom}
          name="nom"
          placeholder="Nom d'utilisateur"
          onChange={this.handleChange} />
        <input
          type="password"
          value={this.state.pwd}
          name="pwd"
          placeholder="Mot de passe"
          onChange={this.handleChange} />
        <button type="submit" onClick={this.handleSubmit}>Valider</button>
      </form>
    )
  }
}

export default Login

const StyledErrorMessage = styled.p`
    margin-top: 15px;
    color: red;
`