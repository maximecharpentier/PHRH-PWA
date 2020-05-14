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
        allSector: ["75", "93", "92/94", "78/95", "77/91"],
        timeSlots: ['Matin', 'Journée', 'Soir'],
        newTeam: {},
        hehe: {plage_h: "Journée", secteur_binome: "75"},
        teamInfos: {},
        editing: false,
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
            // const sliced = Object.keys(this.state.newTeam).slice(2, 4).reduce((result, key) => {
            //     result[key] = this.state.newTeam[key];
            //     return result;
            // }, {});
            // console.log(sliced)
            API.post('/creer/5ebc648504476abde48e40b7/5ebc648504476abde48e40e3/', {plage_h: "Matin", secteur_binome: "91"}).then((response) => {
                console.log(response.data)
                this.setState({
                    newTeam: {
                        user_a_id:"",user_b_id:"", plage_h:null, secteur_binome:""
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
        const { showForm, teams, newTeam, editing, teamInfos, showDeleteConfirm, successMessage, usersWithoutTeam, allSector, timeSlots } = this.state;

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
                            <Input label="Premier membre" name="user_a_id" type="select" users value={editing ? teamInfos.user_a_id : newTeam.user_a_id || ''} options={usersWithoutTeam} handleChange={(e) => this.handleChange(e)} />
                            <Input label="Deuxième membre" name="user_b_id" type="select" users value={editing ? teamInfos.user_b_id : newTeam.user_b_id || ''} firstInputValue={editing ? teamInfos.user_a_id : newTeam.user_a_id || ''} options={usersWithoutTeam} handleChange={(e) => this.handleChange(e)} />
                            <Input label="Plage horaire du binôme" name="plage_h" type="select" value={editing ? teamInfos.plage_h : newTeam.plage_h || ''} timeSlots options={timeSlots} handleChange={(e) => this.handleChange(e)} />
                            <Input label="Secteur du binôme" name="secteur_binome" type="select" value={editing ? teamInfos.secteur_binome : newTeam.secteur_binome || ''} secteur options={allSector} handleChange={(e) => this.handleChange(e)} />
                            
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