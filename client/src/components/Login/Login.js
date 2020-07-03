import React, { Component } from 'react'
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import  { Redirect } from 'react-router-dom'
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
    // if(){
    //   return <Redirect />
    // }
    return (
      <div className="App-Login">
      <Formik
        initialValues={{ nom: '', pwd: '' }}
        onSubmit={(values, { setSubmitting }) => {
          API.post('auth/login/', values).then((response) => {
              console.log(response.data)
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
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
                  <label>Nom</label>
                </div>
                <Field name="nom" />
                <ErrorMessage name="nom" component="div" />
              </div>
              <div className="App-Login_Form_Field">
                <div className="App-Login_Form_Label">
                  <label>Mot de passe</label>
                  <p className="App-Login_Form_Forgot">Mot de passe oublié ?</p>
                </div>
                <Field type="password" name="pwd" />
                <ErrorMessage name="pwd" component="div" />
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