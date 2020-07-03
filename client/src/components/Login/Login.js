import React, { Component } from 'react'
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik'
//import { storeToken } from "./utils/Login.utils"
import {API} from '../../utils/api'

class Login extends Component {
  // userLogin = (e, id) => {
  //   e.preventDefault();
  //   API.post('auth/login', "token").then((response) => {
  //       console.log(response.data)
  //       storeToken(response.data) // recupérer depuis response --> clé BEABER
  //       // redirect to dashboard page
  //   }).catch(error => {
  //       console.log(error.response)
  //   });
  // }

  // const oject = {
  //   nom: null,
  //   pwd: null
  // }

  render() {
    return (
      <div className="App-Login">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = `Veuillez entrer votre adresse email.`;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = `L'email n'est pas valide.`;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          API.post('auth/login/', "admin").then((response) => {
              console.log(response.data)
          }).catch(error => {
              console.log(error.response)
          });
        }}
        >
          {({ isSubmitting }) => (
            <Form className="App-Login_Form">
              <div className="App-Login_Form_Header">
                <h2>Connexion</h2>
                <p>Pour continuer, connectez-vous.</p>
              </div>
              <div className="App-Login_Form_Field">
                <div className="App-Login_Form_Label">
                  <label>Email</label>
                </div>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="App-Login_Form_Field">
                <div className="App-Login_Form_Label">
                  <label>Mot de passe</label>
                  <p className="App-Login_Form_Forgot">Mot de passe oublié ?</p>
                </div>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              <button className="App-Login_Form_Button" type="submit" disabled={isSubmitting}>
                Se connecter
              </button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default Login

const StyledErrorMessage = styled.p`
    margin-top: 15px;
    color: red;
`