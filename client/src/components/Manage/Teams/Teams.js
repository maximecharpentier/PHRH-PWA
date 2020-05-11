import React, { Component } from 'react';

import Card from '../Common/Card/Card';
import Input from '../Common/Input/Input';
import Form from '../Common/Form/Form';
import Modal from '../Common/Modal/Modal';
import Nav from '../Common/Nav/Nav';

import API from '../../../api/api';

class Teams extends Component {
    state = {
        teams: [],
        newTeam: { fonction: "Superviseur", plage_h: null, pwd: "null", jour_bureau: "1995-12-17T03:24:00" },
        teamInfos: {},
        editing: false,
        showForm: false,
        showDeleteConfirm: false,
        showMore: false,
        errorEmptyFieldsMessage: "",
        successMessage: "",
    }

    _refreshTeams = () => {
        API.get('users/').then((response) => {
            this.setState({
                teams: response.data
            })
        })

    }
    componentDidMount() {
        this._refreshTeams()
    }

    componentDidUpdate() {
        !this.state.showForm ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden'
        // console.log(this.state.teams.filter(visitor => visitor.nom.toLowerCase().includes("nino")))
    }

    addVisitor = (e) => {
        e.preventDefault();
        const { nom, prenom, secteur, infos_equipe } = e.target;
        if (nom.value !== "" && prenom.value !== "" && secteur.value !== "" && infos_equipe.value !== "") {
            API.post('users/add/', this.state.newTeam).then((response) => {
                console.log(response.data)
                this.setState({
                    newTeam: {
                        fonction: "Superviseur", plage_h: null, pwd: "null", nom: "", prenom: "", secteur: "", infos_equipe: "", jour_bureau: "lundi"
                    }
                })
                this._refreshTeams()
                this.toggleForm();
                this.showSuccessMessage("L'utilisateur est ajouter")
            }).catch(error => {
                console.log(error.response)
            });
        } else {
            this.setState({
                errorEmptyFieldsMessage: "L'un des champs n'est pas remplie"
            })
        }
    }

    getUserInfo = (user, editUser) => {
        editUser ?
            this.setState({
                teamInfos: user,
                editing: true,
                showForm: !this.state.showForm,
            })
            :
            this.setState({
                teamInfos: user,
                showMore: !this.state.showMore,
            })
    }

    updateUser = (e, id) => {
        e.preventDefault();
        API.post('users/edit/' + id, this.state.teamInfos).then((response) => {
            console.log(response.data)
            this._refreshTeams()
            this.toggleForm();
            this.showSuccessMessage("L'utilisateur est modifier")
        }).catch(error => {
            console.log(error.response)
        });
    }

    getIdForDelete = (id) => {
        this.setState({ idVisitorClicked: id })
        this.toggleDeleteConfirmation()
    }

    toggleDeleteConfirmation = () => {
        this.setState({
            showDeleteConfirm: !this.state.showDeleteConfirm,
        })
    }

    deleteUser = (e) => {
        e.preventDefault()
        API.delete('users/delete/' + this.state.idVisitorClicked).then((response) => {
            console.log(response.data)
            this.toggleDeleteConfirmation()
            this._refreshTeams()
            this.showSuccessMessage("L'utilisateur est supprimer")
        })
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
        this.state.editing && this.setState({ editing: false })
    }

    toggleShowMore = () => {
        this.setState({
            showMore: !this.state.showMore
        })
    }

    showSuccessMessage = (message) => {
        this.setState({
            successMessage: message
        })
        setTimeout(() => {
            this.setState({
                successMessage: ''
            })
        }, 800)
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.state.editing ? this.setState(prevState => ({
            teamInfos: {
                ...prevState.teamInfos,
                [name]: value
            }
        })) : this.setState(prevState => ({
            newTeam: {
                ...prevState.newTeam,
                [name]: value
            }
        }))

    }

    render() {
        const { showForm, showMore, teams, newTeam, editing, teamInfos, showDeleteConfirm, successMessage } = this.state;

        // const optionsOfficeDay = [
        //     { value: 'lundi', label: 'Lundi' },
        //     { value: 'mardi', label: 'Mardi' },
        //     { value: 'mercredi', label: 'Mercredi' },
        //     { value: 'jeudi', label: 'Jeudi' },
        //     { value: 'vendredi', label: 'Vendredi' }
        //   ]

        let allUsers = teams.map((user) => {
            return <Card key={user._id} user={user} editUser={() => this.getUserInfo(user, true)} showMore={() => this.getUserInfo(user)} deleteUser={() => this.getIdForDelete(user._id)} />
        })

        return (
            <div className="visitor-container">

                <Nav items={teams} addForm={this.toggleForm} name="visiteur" />

                {successMessage !== "" &&
                    <>
                        <div className="overlay overlay-light"></div>
                        <div className="success-message">{successMessage}</div>
                    </>
                }

                <section className="card-container">
                    {allUsers}
                </section>

                {showForm &&
                    <Modal title={editing ? "Modifier un visiteur" : "Ajouter un visiteur"} handleClick={this.toggleForm} successMessage={successMessage}>
                        <Form btnSubmit="Valider" handleSubmit={editing ? (e) => this.updateUser(e, teamInfos._id) : this.addVisitor} handleClick={this.toggleForm}>
                            <Input name="nom" type="text" value={editing ? teamInfos.nom : newTeam.nom || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="prenom" type="text" value={editing ? teamInfos.prenom : newTeam.prenom || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="secteur" type="text" value={editing ? teamInfos.secteur : newTeam.secteur || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="infos_equipe" type="text" value={editing ? teamInfos.infos_equipe : newTeam.infos_equipe || ''} handleChange={(e) => this.handleChange(e)} />
                            {/* <Input name="jour_bureau" type="select" value={editing ? teamInfos.jour_bureau : newTeam.jour_bureau || ''} options={optionsOfficeDay} handleChange={(e) => this.handleChange(e)} /> */}
                        </Form>
                    </Modal>
                }
                {showDeleteConfirm &&
                    <Modal handleClick={this.toggleDeleteConfirmation}>
                        <Form btnSubmit="Supprimer" handleSubmit={(e) => this.deleteUser(e)} handleClick={this.toggleDeleteConfirmation}>
                            <p>Êtes-vous sûre de vouloir supprimer ?</p>
                        </Form>
                    </Modal>
                }
                {showMore &&
                    <Modal title={teamInfos.prenom + " " + teamInfos.nom} handleClick={this.toggleShowMore}>
                        <Form showMore>
                            <div className="flex-container">
                                <div>
                                    <p>Adresse</p>
                                    <p>{teamInfos.secteur}</p>
                                </div>
                                <div>
                                    <p>Fonction</p>
                                    <p>{teamInfos.fonction}</p>
                                </div>
                            </div>
                        </Form>
                    </Modal>
                }

            </div>
        );
    }
}
 
export default Teams;