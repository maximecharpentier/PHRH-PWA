import React, { Component } from 'react';

import Card from '../Common/Card/Card';
import Input from '../Common/Input/Input';
import Form from '../Common/Form/Form';
import Modal from '../Common/Modal/Modal';
import Nav from '../Common/Nav/Nav';

import {API} from '../../../utils/api';

class Teams extends Component {
    state = {
        teams: [],
        usersWithoutTeam:[],
        allSector: ["75", "93", "92-94", "78-95", "77-91"],
        timeSlots: ['Matin', 'Journée', 'Soir'],
        newTeam: {},
        showForm: false,
        showDeleteConfirm: false,
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
    }

    addTeam = (e) => {
        e.preventDefault();
        
        const { user_a_id, user_b_id, secteur_binome, plage_h } = e.target;
        if (user_a_id.value !== "" && user_b_id.value !== "" && secteur_binome.value !== "" && plage_h.value !== "") {

            const sliced = Object.keys(this.state.newTeam).slice(2, 4).reduce((result, key) => {
                result[key] = this.state.newTeam[key];
                return result;
            }, {});

            API.post('/gestion/equipes/creer/' + this.state.newTeam.user_a_id + '/' + this.state.newTeam.user_b_id, sliced).then((response) => {
                console.log(response.data)
                this.setState({
                    newTeam: {
                        user_a_id:null,user_b_id:null, plage_h:null, secteur_binome:null
                    }
                })
                this._refreshTeams()
                this.toggleForm();
                this.showSuccessMessage("L'equipe est ajouter")
            }).catch(error => {
                console.log(error.response)
            });
        } else {
            this.setState({
                errorEmptyFieldsMessage: "L'un des champs n'est pas remplie"
            })
        }
    }

    getIdForDelete = (id) => {
        this.setState({ idTeamClicked: id })
        this.toggleDeleteConfirmation()
    }

    toggleDeleteConfirmation = () => {
        this.setState({
            showDeleteConfirm: !this.state.showDeleteConfirm,
        })
    }

    deleteTeam = (e) => {
        e.preventDefault()
        API.delete('/gestion/equipes/delete/' + this.state.idTeamClicked).then((response) => {
            console.log(response.data)
            this.toggleDeleteConfirmation()
            this._refreshTeams()
            this.showSuccessMessage("L'equipe est supprimer")
        })
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
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

        const move = (array, oldIndex, newIndex) => {
            if (newIndex >= array.length) {
                newIndex = array.length - 1;
            }
            array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
            return array;
        }

        if (name === "user_a_id") {
            let firstUserSecteur = this.state.usersWithoutTeam.filter(user => user._id === value)[0].secteur;
            this.setState({
                allSector: move(this.state.allSector, this.state.allSector.indexOf(firstUserSecteur), 0)
            })
            
        } 
        
        this.setState(prevState => ({
            newTeam: {
                ...prevState.newTeam,
                [name]: value
            }
        }))

    }

    render() {
        const { showForm, teams, newTeam, showDeleteConfirm, successMessage, usersWithoutTeam, allSector, timeSlots } = this.state;

        let allTeams = teams.map((team) => {
            return <Card key={team.equipe._id} team={team} deleteTeam={() => this.getIdForDelete(team.equipe._id)} />
        })

        return (
            <div className="visitor-container">

                <Nav items={teams} addForm={this.toggleForm} name="binôme" />

                {successMessage !== "" &&
                    <>
                        <div className="overlay overlay-light"></div>
                        <div className="success-message">{successMessage}</div>
                    </>
                }

                <section className="card-container">
                    {allTeams.length ? allTeams : <div>Il n'y a aucune equipes</div>}
                </section>

                {showForm &&
                    <Modal title={"Ajouter une equipe"} handleClick={this.toggleForm} successMessage={successMessage}>
                        <Form btnSubmit="Valider" handleSubmit={this.addTeam} handleClick={this.toggleForm}>
                            <Input label="Premier membre" title="un visiteur" name="user_a_id" type="select" users value={newTeam.user_a_id || ''} options={usersWithoutTeam} handleChange={(e) => this.handleChange(e)} />
                            <Input label="Deuxième membre" title="un visiteur" name="user_b_id" type="select" users value={newTeam.user_b_id || ''} firstInputValue={newTeam.user_a_id || ''} options={usersWithoutTeam} handleChange={(e) => this.handleChange(e)} />
                            <Input label="Plage horaire du binôme" title="une plage horaire" name="plage_h" type="select" value={newTeam.plage_h || ''} timeSlots options={timeSlots} handleChange={(e) => this.handleChange(e)} />
                            <Input label="Secteur du binôme" title="une secteur pour le binome" name="secteur_binome" type="select" value={newTeam.secteur_binome || ''} secteur options={allSector} handleChange={(e) => this.handleChange(e)} />
                        </Form>
                    </Modal>
                }
                {showDeleteConfirm &&
                    <Modal handleClick={this.toggleDeleteConfirmation}>
                        <Form btnSubmit="Supprimer" handleSubmit={(e) => this.deleteTeam(e)} handleClick={this.toggleDeleteConfirmation}>
                            <p>Êtes-vous sûre de vouloir supprimer ?</p>
                        </Form>
                    </Modal>
                }
            </div>
        );
    }
}
 
export default Teams;