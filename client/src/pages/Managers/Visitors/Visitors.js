import axios from "axios";
import React, { Component } from "react";
import "./styles.scss";
import SubHeader from "../../../components/Common/SubHeader/SubHeader.js";
import VisitorDisplayList from "../../../components/Managers/VisitorDisplayList/VisitorDisplayList.js";
import VisitorDisplayTable from "../../../components/Managers/VisitorDisplayTable/VisitorDisplayTable.js";
import ListItemHeader from "../../../components/Common/ListItemHeader/ListItemHeader.js";

class Visitors extends Component {
  state = {
    isToggled: false,
    users: [],
  };
  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    axios
      .get("http://52.47.86.14:3001/users")
      .then((res) => {
        this.setState({
          users: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  toggle = () => {
    this.setState({
      isToggled: !this.state.isToggled,
    });
  };
  render() {
    return (
      <div className="container">
        <div className="container__inside">
          <SubHeader
            href="/visitors-formula"
            button="Ajouter un visiteur →"
            title="Les visiteurs à votre disposition"
            overtitle="Gestion des visiteurs"
          />
          <ListItemHeader placeholder="Nom / Prénom" toggle={this.toggle} />
          {this.state.isToggled ? (
            <VisitorDisplayList data={this.state.users} />
          ) : (
            <VisitorDisplayTable data={this.state.users} />
          )}
        </div>
      </div>
    );
  }
}

export default Visitors;
