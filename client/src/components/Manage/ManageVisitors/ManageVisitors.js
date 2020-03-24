import React, { Component } from 'react';
import axios from 'axios';
import Card from '../Card/Card'
import Close from '../../../assets/close'

class ManageVisitors extends Component {
    state = {
        visitors: [],
        showForm: false,
        editing: false,
        newVisitor: { fonction: "Superviseur", plage_h: null },
        editVisitor: {}
    }

    _refreshVisitors = () => {
        axios.get('http://localhost:27017/users/').then((response) => {
            this.setState({
                visitors: response.data
            })
        })
    }

    componentDidMount() {
        this._refreshVisitors()
    }

    addVisitor = (e) => {
        e.preventDefault();
        const { nom, prenom, secteur, pwd, infos_equipe } = e.target;
        if (nom.value !== "" && prenom.value !== "" && secteur.value !== "" && pwd.value !== "" && infos_equipe.value !== "") {
            axios.post('http://localhost:27017/users/add/', this.state.newVisitor).then((response) => {
                console.log(response.data)
                this.setState({
                    newVisitor: {
                        fonction: "Superviseur", plage_h: null, nom: "", prenom: "", secteur: "", pwd: "", infos_equipe: ""
                    }
                })
                this._refreshVisitors()
                this.toggleForm();
            }).catch(error => {
                console.log(error.response)
            });
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
        axios.delete('http://localhost:27017/users/delete/' + id).then((response) => {
            console.log(response.data)
            this._refreshVisitors()
        })
    }

    updateUser = (e, id) => {
        e.preventDefault();
        axios.post('http://localhost:27017/users/edit/' + id, this.state.editVisitor).then((response) => {
            console.log(response.data)
            this._refreshVisitors()
            this.toggleForm();
        }).catch(error => {
            console.log(error.response)
        });
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm,
        })
        { this.state.editing && this.setState({ editing: false }) }
    }


    handleChange = (e) => {
        const { name, value } = e.target;
        {
            this.state.editing ? this.setState(prevState => ({
                editVisitor: {
                    ...prevState.editVisitor,
                    [name]: value
                }
            })) : this.setState(prevState => ({
                newVisitor: {
                    ...prevState.newVisitor,
                    [name]: value
                }
            }))
        }
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
                        

                        <div className="popin-form">
                            <div className="popin-header">
                                <h2>{editing ? "Modifier" : "Ajouter"} un visiteur</h2>
                                <span onClick={this.toggleForm}><Close /></span>
                            </div>
                            <form onSubmit={editing ? (e) => this.updateUser(e, editVisitor._id) : this.addVisitor}>
                                <input type="text" placeholder="nom" name="nom" value={editing ? editVisitor.nom : newVisitor.nom || ''} onChange={(e) => this.handleChange(e)} />
                                <input type="text" placeholder="prenom" name="prenom" value={editing ? editVisitor.prenom : newVisitor.prenom || ''} onChange={(e) => this.handleChange(e)} />
                                <input type="text" placeholder="secteur" name="secteur" value={editing ? editVisitor.secteur : newVisitor.secteur || ''} onChange={(e) => this.handleChange(e)} />
                                <input type="text" placeholder="infos_equipe" name="infos_equipe" value={editing ? editVisitor.infos_equipe : newVisitor.infos_equipe || ''} onChange={(e) => this.handleChange(e)} />
                                <input type="text" placeholder="pwd" name="pwd" value={editing ? editVisitor.pwd : newVisitor.pwd || ''} onChange={(e) => this.handleChange(e)} />
                                <button onClick={this.toggleForm}>Annuler</button>
                                <button type="submit">Valider</button>
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