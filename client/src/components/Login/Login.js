import React, { PureComponent } from 'react'
import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik'

export default class Login extends PureComponent {
  render() {
    return (
      <div className="App-Login">
        <Form className="App-Login_Form">
          <div className="App-Login_Form_Header">
            <h2>Connexion</h2>
            <p>Pour continuer, connectez-vous.</p>
          </div>
          <div className="App-Login_Form_Field">
            <div className="App-Login_Form_Label">
              <label>Email</label>
            </div>
            <Field type="text" name="email" placeholder="pierre@example.com" />
            <ErrorMessage id="error" style={ StyledErrorMessage } name="email" />
          </div>
          <div className="App-Login_Form_Field">
            <div className="App-Login_Form_Label">
              <label>Mot de passe</label>
              <p className="App-Login_Form_Forgot">Mot de passe oublié ?</p>
            </div>
            <Field type="password" name="password" placeholder="Mot de passe" />
            <ErrorMessage name="password" />
          </div>
          <button className="App-Login_Form_Button" type="submit">Se connecter</button>
        </Form>
      </div>
    )
  }
}

const StyledErrorMessage = styled.p`
    margin-top: 15px;
    color: red;
`