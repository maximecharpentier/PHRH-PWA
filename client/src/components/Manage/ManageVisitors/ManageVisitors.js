import React, { Component } from 'react';

import Card from '../Card/Card'
import Input from '../Input/Input'

import API from '../../../api/api'

import Close from '../../../assets/close'


class ManageVisitors extends Component {
    state = {
        visitors: [],
        showForm: false,
        editing: false,
        errorEmptyFields: false,
        newVisitor: { fonction: "Superviseur", plage_h: null, pwd: "null" },
        editVisitor: {}
    }

    _refreshVisitors = () => {
        API.get('users/').then((response) => {
            this.setState({
                visitors: response.data
            })
        })
    }

    componentDidMount() {
        this._refreshVisitors()

    }

    componentDidUpdate() {
        { !this.state.showForm ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden' }
    }

    addVisitor = (e) => {
        e.preventDefault();
        const { nom, prenom, secteur, infos_equipe } = e.target;
        if (nom.value !== "" && prenom.value !== "" && secteur.value !== "" && infos_equipe.value !== "") {
            API.post('users/add/', this.state.newVisitor).then((response) => {
                console.log(response.data)
                this.setState({
                    newVisitor: {
                        fonction: "Superviseur", plage_h: null, pwd: "null", nom: "", prenom: "", secteur: "", infos_equipe: ""
                    }
                })
                this._refreshVisitors()
                this.toggleForm();
            }).catch(error => {
                console.log(error.response)
            });
        } else {
            this.setState({
                errorEmptyFields: true
            })
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
        API.delete('users/delete/' + id).then((response) => {
            console.log(response.data, id)
            this._refreshVisitors()
        })
    }

    updateUser = (e, id) => {
        e.preventDefault();
        API.post('users/edit/' + id, this.state.editVisitor).then((response) => {
            console.log(response.data)
            this._refreshVisitors()
            this.toggleForm();
        }).catch(error => {
            console.log(error.response)
        });
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
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

                                <section className="popin-form-container">

                                    <Input name="nom" type="text" value={editing ? editVisitor.nom : newVisitor.nom || ''} handleChange={(e) => this.handleChange(e)} />
                                    <Input name="prenom" type="text" value={editing ? editVisitor.prenom : newVisitor.prenom || ''} handleChange={(e) => this.handleChange(e)} />
                                    <Input name="secteur" type="text" value={editing ? editVisitor.secteur : newVisitor.secteur || ''} handleChange={(e) => this.handleChange(e)} />
                                    <Input name="infos_equipe" type="text" value={editing ? editVisitor.infos_equipe : newVisitor.infos_equipe || ''} handleChange={(e) => this.handleChange(e)} />

                                </section>

                                <div className="popin-form-btn-container">
                                    <button onClick={this.toggleForm}>Annuler</button>
                                    <button type="submit">Valider</button>
                                </div>

                            </form>
                        </div>
                    </>
                }
                <div className="flex-container">
                    <p>{visitors.length} visiteurs</p>
                    <button onClick={this.toggleForm}>Ajouter un visiteur</button>
                </div>
                <section className="planificator-card-container">
                    {allUsers}
                </section>

            </div>
        );
    }
}


export default ManageVisitors;