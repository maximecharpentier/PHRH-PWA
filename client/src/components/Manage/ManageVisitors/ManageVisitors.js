import React, { Component } from 'react';
import axios from 'axios';
import Card from '../Card/Card'

class ManageVisitors extends Component {
    state = {
        visitors: [],
        showForm: false,
        editing: false,
        newVisitor: { nom: "", prenom: "", secteur: "" },
        editVisitor: {}
    }

    _refreshVisitors = () => {
        axios.get('http://35.180.37.72:3001/users/').then((response) => {
            this.setState({
                visitors: response.data
            })
        })
    }

    componentWillMount() {
        this._refreshVisitors()
    }

    addVisitor = (e) => {
        e.preventDefault();
        if (e.target.nom.value !== "" && e.target.prenom.value !== "" && e.target.secteur.value !== "") {
            axios.post('http://35.180.37.72:3001/users/', this.state.newVisitor).then((response) => {
                let { visitors } = this.state;
                visitors.concat(response.data)
                this.setState({
                    visitors, newVisitor: {
                        nom: "", prenom: "", secteur: ""
                    }
                })
                this._refreshVisitors()
            })
            this.toggleForm();
        }
    }

    editUser = (user) => {
        this.setState({
            editVisitor: user,
            editing: true,
            showForm: !this.state.showForm,
        })
    }

    deleteUser = (id) => {
        axios.delete('http://35.180.37.72:3001/users/' + id).then((response) => {
            console.log(response.data)
            this._refreshVisitors()
        })
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm,
        })
        if(this.state.editing){
            this.setState({
                editing: false
            })
        }
    }



    render() {
        const { showForm, visitors, newVisitor, editing , editVisitor} = this.state;
        let allUsers = visitors.map((user, id) => {
            return <Card key={id} user={user} editUser={() => this.editUser(user)} deleteUser={() => this.deleteUser(user.id)} />
        })

        return (
            <div className="planificateur-container">
                {showForm &&
                    <>
                        <div className="backgroundBody"></div>
                        <div className="addForm">
                            <form onSubmit={this.addVisitor}>
                                <input type="text" placeholder="nom" name="nom" value={editing ? editVisitor.nom : newVisitor.nom} onChange={(e) => {
                                    newVisitor.nom = e.target.value
                                    this.setState({ newVisitor })
                                }} />
                                <input type="text" placeholder="prenom" name="prenom" value={editing ? editVisitor.prenom : newVisitor.prenom} onChange={(e) => {
                                    newVisitor.prenom = e.target.value
                                    this.setState({ newVisitor })
                                }} />
                                <input type="text" placeholder="secteur" name="secteur" value={editing ? editVisitor.secteur : newVisitor.secteur} onChange={(e) => {
                                    newVisitor.secteur = e.target.value
                                    this.setState({ newVisitor })
                                }} />
                                <button type="submit">{editing ? "Modifier" : "Ajouter"}</button>
                                <span onClick={this.toggleForm}>X</span>
                            </form>
                        </div>
                    </>
                }
                <div className="flex-container">
                    <p>{visitors.length} visiteurs</p>
                    <button onClick={this.toggleForm}>Ajouter un visiteur</button>
                </div>
                {allUsers}
            </div>
        );
    }
}


export default ManageVisitors;