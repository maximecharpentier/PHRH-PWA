import axios from 'axios'
import React, { Component } from 'react';
import './styles.scss'
import SubHeader from '../../../components/Common/SubHeader/SubHeader.js'
import HotelDisplayList from '../../../components/Managers/HotelDisplayList/HotelDisplayList.js'
import HotelDisplayTable from '../../../components/Managers/HotelDisplayTable/HotelDisplayTable.js'
import ListItemHeader from '../../../components/Common/ListItemHeader/ListItemHeader.js'

class Hotels extends Component {
  state = {
    isToggled: false,
    hotels: []
  }
  componentDidMount() {
    this.getHotels();
  }
  getHotels = () => {
    axios.get('http://35.180.37.72:3001/hotels')
      .then(res => {
        this.setState({
          hotels: res.data
        }, () => console.log(res.data))
        
      })
      .catch(err => {
        console.error(err);
      })
  }
   toggle = () =>  {
    this.setState({
      isToggled: !this.state.isToggled
    })
  }
  render() {
    return <div className="container">
      <div className="container__inside">
        <SubHeader href="/hotels-formula" button="Ajouter un hôtel →" title="Les hôtels à votre disposition" overtitle="Gestion des hôtels" />
        <ListItemHeader placeholder="Hôtels / Adresses" toggle={this.toggle} />
        {
          this.state.isToggled ? 
          <HotelDisplayList data={this.state.hotels}/> : 
          <HotelDisplayTable data={this.state.hotels} />
        }
    </div>
  </div>
  }
}

export default Hotels;