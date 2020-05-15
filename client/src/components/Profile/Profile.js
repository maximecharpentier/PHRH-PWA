import React, { Component } from 'react';

import Modal from '../Manage/Modal/Modal.js'
import Input from '../Manage/Input/Input.js'
import Form from '../Manage/Form/Form.js'

class Profile extends Component {
  state = {
    isModal: false
  }
  openModal = () => {
    this.setState({ isModal: true })
  }
  closeModal = () => {
      this.setState({ isModal: false })
  }
  render() {
    return (
      <section>
        <header>
            <h2>Profil de <br /> Gilles Epié <span>.</span></h2>
        </header>
        <div>
          <div className="flex-container">
            <h2>Profil</h2>
            <button onClick={this.openModal}>Modifier votre profil</button>
          </div>
          <br />
          <p><span>Prénom :</span> Gilles</p>
          <br />
          <p><span>Nom :</span> Epié</p>
          <br />
          <p><span>Email :</span> gilles.epie@gmail.com</p>
          <br />
          <p><span>A propos :</span> Je suis disponible 5j/7.</p>
          { this.state.isModal ?  
            <Modal title={"Modifier votre profil"} handleClick={this.closeModal}>
              <Form btnSubmit="Enregistrer">
                <Input name="Nom" type="text" placeholder="Nom" value={'Epié'} />
                <Input name="Prénom" type="text" placeholder="Prénom" value={'Gilles'} />
                <Input name="Email" type="text" placeholder="Email" value={'gilles.epie@gmail.com'} />
                <Input name="Mot de passe" type="password" placeholder="Mot de passe" value={'coucououinonoui'} />
                <Input name="A propos" type="text" placeholder="A propos" value={'Je suis disponible 5j/7.'} />
              </Form>
            </Modal> : ''
          }
        </div>
      </section>
    );
  }
}
export default Profile;