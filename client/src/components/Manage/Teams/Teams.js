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
        usersWithoutTeam:[],
        newTeam: {},
        teamInfos: {},
        editing: false,
        showForm: false,
        showDeleteConfirm: false,
        showMore: false,
        errorEmptyFieldsMessage: "",
        successMessage: "",
    }

    _refreshTeams = () => {
        API.get('gestion/equipes/').then((response) => {
            this.setState({
                teams: response.data
            })
        })
    }

    getUsersWithoutTeam = () => {
        API.get('gestion/equipes/users').then((response) => {
            this.setState({
                usersWithoutTeam: response.data
            })
        })
    }

    componentDidMount() {
        this._refreshTeams()
        this.getUsersWithoutTeam()
    }

    componentDidUpdate() {
        !this.state.showForm ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden'
        // console.log(this.state.teams.filter(visitor => visitor.nom.toLowerCase().includes("nino")))
    }

    addTeam = (e) => {
        e.preventDefault();
        const { nom, prenom, secteur, infos_equipe } = e.target;
        if (nom.value !== "" && prenom.value !== "" && secteur.value !== "" && infos_equipe.value !== "") {
            API.post('teams/add/', this.state.newTeam).then((response) => {
                console.log(response.data)
                this.setState({
                    newTeam: {
                        fonction: "Intervenant terrain", plage_h: null, pwd: "null", nom: "", prenom: "", secteur: "", infos_equipe: "", jour_bureau: "lundi"
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

    getTeamInfo = (team, editTeam) => {
        editTeam ?
            this.setState({
                teamInfos: team,
                editing: true,
                showForm: !this.state.showForm,
            })
            :
            this.setState({
                teamInfos: team,
                showMore: !this.state.showMore,
            })
    }

    // updateteam = (e, id) => {
    //     e.preventDefault();
    //     API.post('teams/edit/' + id, this.state.teamInfos).then((response) => {
    //         console.log(response.data)
    //         this._refreshTeams()
    //         this.toggleForm();
    //         this.showSuccessMessage("L'utilisateur est modifier")
    //     }).catch(error => {
    //         console.log(error.response)
    //     });
    // }

    // getIdForDelete = (id) => {
    //     this.setState({ idVisitorClicked: id })
    //     this.toggleDeleteConfirmation()
    // }

    // toggleDeleteConfirmation = () => {
    //     this.setState({
    //         showDeleteConfirm: !this.state.showDeleteConfirm,
    //     })
    // }

    // deleteTeam = (e) => {
    //     e.preventDefault()
    //     API.delete('teams/delete/' + this.state.idVisitorClicked).then((response) => {
    //         console.log(response.data)
    //         this.toggleDeleteConfirmation()
    //         this._refreshTeams()
    //         this.showSuccessMessage("L'utilisateur est supprimer")
    //     })
    // }

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
        const { showForm, teams, newTeam, editing, teamInfos, showDeleteConfirm, successMessage, usersWithoutTeam } = this.state;

        let allTeams = teams.map((team) => {
            return <Card key={team._id} team={team} editTeam={() => this.getTeamInfo(team, true)} showMore={() => this.getTeamInfo(team)} deleteTeam={() => this.getIdForDelete(team._id)} />
        })

        return (
            <div className="visitor-container">

                <Nav items={teams} addForm={this.toggleForm} name="binôme" />

                {/* {successMessage !== "" &&
                    <>
                        <div className="overlay overlay-light"></div>
                        <div className="success-message">{successMessage}</div>
                    </>
                } */}

                <section className="card-container">
                    {allTeams}
                </section>

                {showForm &&
                    <Modal title={editing ? "Modifier une equipe" : "Ajouter une equipe"} handleClick={this.toggleForm} successMessage={successMessage}>
                        <Form btnSubmit="Valider" handleSubmit={editing ? (e) => this.updateTeam(e, teamInfos._id) : this.addTeam} handleClick={this.toggleForm}>
                            <Input label="Premier membre" name="user_a_id" type="select" team value={editing ? teamInfos.user_a_id : newTeam.user_a_id || ''} options={usersWithoutTeam} handleChange={(e) => this.handleChange(e)} />
                            <Input label="Deuxième membre" name="user_b_id" type="select" team value={editing ? teamInfos.user_b_id : newTeam.user_b_id || ''} firstInputValue={editing ? teamInfos.user_a_id : newTeam.user_a_id || ''} options={usersWithoutTeam} handleChange={(e) => this.handleChange(e)} />
                            {/* <Input label="Secteur" name="secteur" type="select" team value={editing ? teamInfos.user_b_id : newTeam.user_b_id || ''} firstInputValue={editing ? teamInfos.user_a_id : newTeam.user_a_id || ''} options={usersWithoutTeam} handleChange={(e) => this.handleChange(e)} /> */}
                        </Form>
                    </Modal>
                }
                {/* {showDeleteConfirm &&
                    <Modal handleClick={this.toggleDeleteConfirmation}>
                        <Form btnSubmit="Supprimer" handleSubmit={(e) => this.deleteTeam(e)} handleClick={this.toggleDeleteConfirmation}>
                            <p>Êtes-vous sûre de vouloir supprimer ?</p>
                        </Form>
                    </Modal>
                } */}
            </div>
        );
    }
}
 
export default Teams;