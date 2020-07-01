import React, { Component } from 'react';

import Card from '../Common/Card/Card';
import Input from '../Common/Input/Input';
import Form from '../Common/Form/Form';
import Modal from '../Common/Modal/Modal';
import Nav from '../Common/Nav/Nav';

import { API } from '../../../utils/api';

class Emergencies extends Component {
    state = {
        emergencies: [],
        hotels: [],
        teams: [],
        newEmergency: {},
        emergencyInfos: {emergencyDone: false},
        hotelInputValueEdit: "",
        hotelInputValue: "",
        editing: false,
        showForm: false,
        editingInputHotel: false,
        showDeleteConfirm: false,
        errorEmptyFieldsMessage: "",
        successMessage: "",
        currentWeek: [],
    }

    _refreshEmergencies = () => {
        API.get('urgences/').then((response) => {
            this.setState({
                emergencies: response.data
            })
        })

    }

    getHotels = () => {
        API.get('/hotels').then((response) => {
            this.setState({
                hotels: response.data
            })
        })
    }

    getTeams = () => {
        API.get('/gestion/equipes').then((response) => {
            this.setState({
                teams: response.data
            })
        })
    }

    componentDidMount() {
        this._refreshEmergencies()
        this.getTeams()
    }

    componentDidUpdate() {
        !this.state.showForm ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden'
    }

    addEmergency = (e) => {
        e.preventDefault();
        const { detail, equipe_id, hotel_id, resume } = e.target;
        if (detail.value !== "" && equipe_id.value !== "" && hotel_id.value !== "" && resume.value !== "") {
            API.post('urgences/add', this.state.newEmergency).then((response) => {
                this.setState({
                    newEmergency: {
                        detail: "", equipe_id: "", hotel_id: "", resume: ""
                    },
                    hotelInputValue: ""
                })
                this._refreshEmergencies()
                this.toggleForm();
                this.showSuccessMessage("L'urgence est ajouter")
            }).catch(error => {
                console.log(error.response)
            });
        } else {
            this.setState({
                errorEmptyFieldsMessage: "L'un des champs n'est pas remplie"
            })
        }
    }

    getEmergencyInfo = (emergency, editEmergency) => {
        this.setState({
            emergencyInfos: emergency,
            editing: true,
            showForm: !this.state.showForm,
            hotelInputValueEdit: emergency.hotel_id

        })
    }

    updateEmergency = (e, id) => {
        e.preventDefault();
        API.post('urgences/edit/' + id, this.state.emergencyInfos).then((response) => {
            console.log(response.data)
            this._refreshEmergencies()
            this.toggleForm();
            this.showSuccessMessage("L'urgence est modifier")
        }).catch(error => {
            console.log(error.response)
        });
    }

    getIdForDelete = (id) => {
        this.setState({ idEmergencyClicked: id })
        this.toggleDeleteConfirmation()
    }

    toggleDeleteConfirmation = () => {
        this.setState({
            showDeleteConfirm: !this.state.showDeleteConfirm,
        })
    }

    deleteEmergency = (e) => {
        e.preventDefault()
        API.delete('urgences/delete/' + this.state.idEmergencyClicked).then((response) => {
            console.log(response.data)
            this.toggleDeleteConfirmation()
            this._refreshEmergencies()
            this.showSuccessMessage("L'urgence est supprimer")
        })
    }

    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
        this.state.editing && this.setState({ editing: false })
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
        const { name, value, type, checked } = e.target;

        if (name === "hotel_id") {
            this.state.editing ? this.setState({
                hotelInputValueEdit: value,
                editingInputHotel: false
            }) : this.setState({
                hotelInputValue: value,
                editingInputHotel: false
            })
            API.get('/hotels').then((response) => {
                const hotels = response.data.filter(hotel => hotel.nom.toLowerCase().includes(value.toLowerCase())).splice(0, 5)
                this.setState({
                    hotels
                })
            })
        } else if (type === "checkbox") {
            this.setState(prevState => ({
                emergencyInfos: {
                    ...prevState.emergencyInfos,
                    emergencyDone: checked
                }
            }))
        } else {

            this.state.editing ? this.setState(prevState => ({
                emergencyInfos: {
                    ...prevState.emergencyInfos,
                    [name]: value
                }
            })) : this.setState(prevState => ({
                newEmergency: {
                    ...prevState.newEmergency,
                    [name]: value
                }
            }))
        }

    }

    addHotelInInput = (hotel) => {
        this.state.editing ? this.setState(prevState => ({
            emergencyInfos: {
                ...prevState.emergencyInfos,
                hotel_id: hotel._id
            },
            hotelInputValueEdit: hotel.nom,
            editingInputHotel: true
        })) : this.setState(prevState => ({
            newEmergency: {
                ...prevState.newEmergency,
                hotel_id: hotel._id
            },
            hotelInputValue: hotel.nom,
            editingInputHotel: true
        }))
    }

    render() {
        const { showForm, emergencies, newEmergency, editing, emergencyInfos, showDeleteConfirm, successMessage, teams, hotels, hotelInputValueEdit, hotelInputValue, editingInputHotel } = this.state;

        let allEmergencies = emergencies.map((emergency) => {
            return <Card key={emergency._id} emergency={emergency} editEmergency={() => this.getEmergencyInfo(emergency, true)} deleteEmergency={() => this.getIdForDelete(emergency._id)} />
        })

        return (
            <div className="emergency-container">

                <Nav items={emergencies} addForm={this.toggleForm} name="urgence" />

                {successMessage !== "" &&
                    <>
                        <div className="overlay overlay-light"></div>
                        <div className="success-message">{successMessage}</div>
                    </>
                }

                <section className="card-container">
                    {allEmergencies.length ? allEmergencies : <div>Il n'y a aucune urgences</div>}
                </section>

                {showForm &&
                    <Modal title={editing ? "Modifier une urgence" : "Ajouter une urgence"} handleClick={this.toggleForm} successMessage={successMessage}>
                        <Form btnSubmit="Valider" handleSubmit={editing ? (e) => this.updateEmergency(e, emergencyInfos._id) : this.addEmergency} handleClick={this.toggleForm}>
                            <Input label="Choisir un hôtel" name="hotel_id" type="text" value={editing ? hotelInputValueEdit : hotelInputValue || ''} handleChange={(e) => this.handleChange(e)} >
                                {hotels && hotels.length > 0 && !editingInputHotel ?
                                    <ul>
                                        {(hotelInputValueEdit || hotelInputValue !== "") && hotels.map((hotel, id) => <li onClick={() => this.addHotelInInput(hotel)} key={id} >{hotel.nom}</li>)}
                                    </ul> :
                                    ""
                                }
                            </Input>
                            <Input label="Choisir un binôme" name="equipe_id" type="select" value={editing ? emergencyInfos.equipe_id : newEmergency.equipe_id || ''} teamUrgency options={teams} handleChange={(e) => this.handleChange(e)} />
                            <Input label="Nom de l'urgence" name="resume" type="text" value={editing ? emergencyInfos.resume : newEmergency.resume || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input label="Nature de l'urgence" name="detail" type="textarea" value={editing ? emergencyInfos.detail : newEmergency.detail || ''} handleChange={(e) => this.handleChange(e)} />
                            {/* {editing && <><input type="checkbox" name="state" id="state" defaultChecked={this.state.emergencyInfos.emergencyDone} onChange={(e) => this.handleChange(e)} /><label htmlFor="state">Urgence traité</label></>} */}
                        </Form>
                    </Modal>
                }
                {showDeleteConfirm &&
                    <Modal handleClick={this.toggleDeleteConfirmation}>
                        <Form btnSubmit="Supprimer" handleSubmit={(e) => this.deleteEmergency(e)} handleClick={this.toggleDeleteConfirmation}>
                            <p>Êtes-vous sûre de vouloir supprimer ?</p>
                        </Form>
                    </Modal>
                }

            </div>
        );
    }
}

export default Emergencies;