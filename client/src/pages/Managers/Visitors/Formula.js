import axios from "axios";
import React, { Component } from "react";
import "./styles.scss";
import SubHeader from "../../../components/Common/SubHeader/SubHeader.js";

import Input from "../../../components/Common/Input/Input";
import Button from "../../../components/Common/Button/Button";

class VisitorsFormula extends Component {
  state = {
    users: [],
  };
  binomes = [
    { value: "michel", label: "Michel" },
    { value: "roger", label: "Roger" },
    { value: "jean", label: "Jean" },
  ];
  plage_h = [
    { value: "first", label: "9h30 → 12h30" },
    { value: "second", label: "14h30 → 18h30" },
  ];
  work_days = [
    { value: "lundi", label: "Lundi" },
    { value: "mardi", label: "Mardi" },
    { value: "mercredi", label: "Mercredi" },
    { value: "jeudi", label: "Jeudi" },
    { value: "vendredi", label: "Vendredi" },
    { value: "samedi", label: "Samedi" },
    { value: "dimanche", label: "Dimanche" },
  ];
  componentDidMount() {
    this.getUsers();
  }
  getUsers = () => {
    axios
      .get("http://52.47.86.14:3001/users")
      .then((res) => {
        this.setState({
          hotels: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  render() {
    return (
      <div className="container">
        <div className="container__inside">
          <SubHeader
            title="Ajouter un visiteur"
            overtitle="Gestion des visiteurs"
          />
          <div className="container__inputs">
            <Input label="Prénom" placeholder="Sarah" />
            <Input label="Nom" placeholder="Dupont" />
            <Input label="Adresse" placeholder="22 rue Genetta" />
            <Input type="number" label="Code postal" placeholder="75002" />
            <Input label="Secteur" placeholder="75 - 91" />
            <Input type="select" label="Binôme" options={this.binomes} />
            <Input type="select" label="Plage horaire" options={this.plage_h} />
            <Input
              isMulti
              closeMenuOnSelect={false}
              type="select"
              label="Journée(s) de bureau"
              options={this.work_days}
            />
            <Input
              label="Indisponibilité"
              placeholder="Du 27/05/2020 au 31/05/2020"
            />
          </div>
          <Button title="Valider →" />
        </div>
      </div>
    );
  }
}

export default VisitorsFormula;
