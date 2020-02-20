import React, { PureComponent } from 'react'
import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik'

export default class Login extends PureComponent {
  render() {
    return (
      <div className="App-Login">
        <Form className="App-Login_Form">
          <div className="App-Login_Form_Header">
            <p>Connexion</p>
          </div>
          <label>Nom d'utilisateur</label>
          <Field type="text" name="username" placeholder="Nom d'utilisateur" />
          <ErrorMessage style={ StyledErrorMessage } name="email" />
          <label>Mot de passe</label>
          <Field type="text" name="password" placeholder="Mot de passe" />
          <ErrorMessage name="password" />
          <p className="App-Login_Form_Forgot">Mot de passe oublié ?</p>
          <button className="App-Login_Form_Button" type="submit">Se connecter</button>
        </Form>
      </div>
    )
  }
}

const StyledErrorMessage = styled.p`
    color: red;
`