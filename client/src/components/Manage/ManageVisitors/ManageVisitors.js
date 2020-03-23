import React, { Component } from 'react';
import axios from 'axios';
import Card from '../Card/Card'

class ManageVisitors extends Component {
    state = {
        visitors: [],
        showForm: false,
        editing: false,
        newVisitor: { plage_h:null, equipier_id: null, vehicule_id: null },
        aVisitor: {"_id":"5feferfferfr'efzr'dbferfecff1e24918bfe","nom":"hpmkb","prenom":"z02r4f","pwd":"ck8r5j","fonction":"Superviseur","secteur":"75","plage_h":null,"infos_equipe":"nce30q","equipier_id":null,"vehicule_id":null,"__v":0},
        editVisitor: {}
    }

    _refreshVisitors = () => {
        axios.get('http://localhost:27017/users/').then((response) => {
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
        const { nom, prenom, secteur, pwd, plage_h, fonction, infos_equipe } = e.target;
        // console.log(this.state.newVisitor, this.state.aVisitor)
        // if (nom.value !== "" && prenom.value !== "" && secteur.value !== "" && pwd.value !== "" && fonction.value !== "" && infos_equipe.value !== "") {
            axios.post('http://localhost:27017/users/add', this.state.newVisitor).then((response) => {
                console.log(response.data)
                // this.setState({
                //      newVisitor: {
                //         nom: "", prenom: "", secteur: ""
                //     }
                // })
                this._refreshVisitors()
            })
            // this.toggleForm();
        // }
    }

    editUser = (user) => {
        this.setState({
            editVisitor: user,
            editing: true,
            showForm: !this.state.showForm,
        })
    }

    deleteUser = (id) => {
        axios.delete('http://localhost:27017/users/delete/' + id).then((response) => {
            console.log(response.data)
            this._refreshVisitors()
        })
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm,
        })
        if (this.state.editing) {
            this.setState({
                editing: false
            })
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            newVisitor: {
                ...prevState.newVisitor,
                [name]: value
            }
        }))
    }



    render() {
        const { showForm, visitors, newVisitor, editing, editVisitor } = this.state;
        let allUsers = visitors.map((user) => {
            return <Card key={user._id} user={user} editUser={() => this.editUser(user)} deleteUser={() => this.deleteUser(user._id)} />
        })

        return (
            <div className="planificateur-container">
                {showForm &&
                    <>
                        <div className="backgroundBody"></div>
                        <div className="addForm">
                            <form onSubmit={this.addVisitor}>
                                <input type="text" placeholder="nom" name="nom" value={editing ? editVisitor.nom : newVisitor.nom} onChange={(e) => this.handleChange(e)} />
                                <input type="text" placeholder="prenom" name="prenom" value={editing ? editVisitor.prenom : newVisitor.prenom} onChange={(e) => this.handleChange(e)} />
                                <input type="text" placeholder="secteur" name="secteur" value={editing ? editVisitor.secteur : newVisitor.secteur} onChange={(e) => this.handleChange(e)} />
                                <input type="text" placeholder="fonction" name="fonction" value={editing ? editVisitor.fonction : newVisitor.fonction} onChange={(e) => this.handleChange(e)} />
                                <input type="text" placeholder="infos_equipe" name="infos_equipe" value={editing ? editVisitor.infos_equipe : newVisitor.infos_equipe} onChange={(e) => this.handleChange(e)} />
                                <input type="text" placeholder="pwd" name="pwd" value={editing ? editVisitor.pwd : newVisitor.pwd} onChange={(e) => this.handleChange(e)} />
                                {/* <input type="text" placeholder="plage_h" name="plage_h" value={editing ? editVisitor.plage_h : newVisitor.plage_h} onChange={(e) => this.handleChange(e)} /> */}
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