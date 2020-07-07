import axios from 'axios'
import React, { Component } from 'react';
import './styles.scss'
import SubHeader from '../../../components/Common/SubHeader/SubHeader.js'

import Input from '../../../components/Common/Input/Input'
import Button from '../../../components/Common/Button/Button'

class HotelsFormula extends Component {
  state = {
    hotels: []
  }
  options = [
    { value: 'urgence', label: 'Urgence' },
    { value: 'visite', label: 'Visite' },
    { value: 'contre-visite', label: 'Contre-visite' }
  ]
  componentDidMount() {
    this.getHotels();
  }
  getHotels = () => {
    axios.get('http://52.47.86.14:3001/hotels')
      .then(res => {
        this.setState({
          hotels: res.data
        })
        
      })
      .catch(err => {
        console.error(err);
      })
  }
  render() {
    return <div className="container">
      <div className="container__inside">
        <SubHeader title="Ajouter un hôtel" overtitle="Gestion des hôtels" />
        <div className="container__inputs">
          <Input label="Nom de l'hôtel" placeholder="Welcomo" />
          <Input label="Adresse" placeholder="22 rue Genetta" />
          <Input type="number" label="Code postal" placeholder="75002" />
          <Input label="Secteur" placeholder="75 - 91" />
          <Input type="number" min="0" max="100" label="Note" placeholder="29,1" />
          <Input type="select" label="Etat" options={this.options} />
          <Input label="Date de dernière visite" placeholder="22/07/2020" />
        </div>
        <Button title="Valider →" />
    </div>
  </div>
  }
}

export default HotelsFormula;