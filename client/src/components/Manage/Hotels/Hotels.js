import React, { Component } from 'react';

import Card from '../Common/Card/Card';
import Input from '../Common/Input/Input';
import Form from '../Common/Form/Form';
import Modal from '../Common/Modal/Modal';
import Nav from '../Common/Nav/Nav';

import {API} from '../../../api/api';


class Hotels extends Component {
    state = {
        hotels: [],
        newHotel: {},
        hotelInfos: {},
        editing: false,
        showForm: false,
        showDeleteConfirm: false,
        successMessage: "",
    }

    _refreshHotels = () => {
        API.get('hotels/').then((response) => {
            this.setState({
                hotels: response.data
            })
        })
    }

    componentDidMount() {
        this._refreshHotels()
    }

    componentDidUpdate() {
        !this.state.showForm ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden'
    }

    addHotel = (e) => {
        e.preventDefault();
        const { nom, adresse, cp, ville, nb_chambres_utilise, nb_visites_periode, last_time_visited } = e.target;
        if (nom.value !== "" && adresse.value !== "" && cp.value !== "" && ville.value !== "" && nb_chambres_utilise.value !== "" && nb_visites_periode.value !== "" && last_time_visited.value !== "") {
            API.post('hotels/add/', this.state.newHotel).then((response) => {
                console.log(response.data)
                this.setState({
                    newHotel: {
                        nom: "", adresse: "", cp: "", ville: "", nb_chambres_utilise: "", nb_visites_periode: "", last_time_visited: ""
                    }
                })
                this._refreshHotels()
                this.toggleForm();
                this.showSuccessMessage("L'hôtel est ajouter")
            }).catch(error => {
                console.log(error.response)
            });
        } else {
            this.setState({
                errorEmptyFieldsMessage: "L'un des champs n'est pas remplie"
            })
        }
    }

    getHotelInfo = (user, editHotel) => {
        editHotel ? 
        this.setState({
            hotelInfos: user,
            editing: true,
            showForm: !this.state.showForm,
        })
        :
        this.setState({
            hotelInfos: user,
            showMore: !this.state.showMore,
        })
    }

    updateHotel = (e, id) => {
        e.preventDefault();
        API.post('hotels/edit/' + id, this.state.hotelInfos).then((response) => {
            console.log(response.data)
            this._refreshHotels()
            this.toggleForm();
            this.showSuccessMessage("L'hôtel est modifier")
        }).catch(error => {
            console.log(error.response)
        });
    }

    getIdForDelete = (id) => {
        this.setState({ idHotelClicked: id })
        this.toggleDeleteConfirmation()
    }

    toggleDeleteConfirmation = () => {
        this.setState({
            showDeleteConfirm: !this.state.showDeleteConfirm,
        })
    }

    deleteHotel = (e) => {
        e.preventDefault()
        API.delete('hotels/delete/' + this.state.idHotelClicked).then((response) => {
            console.log(response.data)
            this.toggleDeleteConfirmation()
            this._refreshHotels()
            this.showSuccessMessage("L'Hotel est supprimer")
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
            hotelInfos: {
                ...prevState.hotelInfos,
                [name]: value
            }
        })) : this.setState(prevState => ({
            newHotel: {
                ...prevState.newHotel,
                [name]: value
            }
        }))

    }

    render() {
        const { showForm, hotels, newHotel, editing, hotelInfos, showDeleteConfirm, successMessage } = this.state;

        let allHotels = hotels.map((hotel) => {
            return <Card key={hotel._id} hotel={hotel} editHotel={() => this.getHotelInfo(hotel, true)} showMore={() => this.getHotelInfo(hotel)} deleteHotel={() => this.getIdForDelete(hotel._id)} />
        })

        return (
            <div className="hotel-container">

                <Nav items={hotels} addForm={this.toggleForm} name="hotel" />

                {successMessage !== "" &&
                    <>
                        <div className="overlay overlay-light"></div>
                        <div className="success-message">{successMessage}</div>
                    </>
                }

                <section className="card-container">
                    {allHotels}
                </section>

                {showForm &&
                    <Modal title={editing ? "Modifier un hotel" : "Ajouter un hotel"} handleClick={this.toggleForm}>
                        <Form btnSubmit="Valider" handleSubmit={editing ? (e) => this.updateHotel(e, hotelInfos._id) : this.addHotel} handleClick={this.toggleForm}>
                            <Input name="nom" type="text" value={editing ? hotelInfos.nom : newHotel.nom || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="adresse" type="text" value={editing ? hotelInfos.adresse : newHotel.adresse || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="cp" type="text" value={editing ? hotelInfos.cp : newHotel.cp || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="ville" type="text" value={editing ? hotelInfos.ville : newHotel.ville || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="nb_chambres_utilise" type="text" value={editing ? hotelInfos.nb_chambres_utilise : newHotel.nb_chambres_utilise || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="nb_visites_periode" type="text" value={editing ? hotelInfos.nb_visites_periode : newHotel.nb_visites_periode || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="last_time_visited" type="text" value={editing ? hotelInfos.last_time_visited : newHotel.last_time_visited || ''} handleChange={(e) => this.handleChange(e)} />
                        </Form>
                    </Modal>
                }
                {showDeleteConfirm &&
                    <Modal handleClick={this.toggleDeleteConfirmation}>
                        <Form btnSubmit="Supprimer" handleSubmit={(e) => this.deleteHotel(e)} handleClick={this.toggleDeleteConfirmation}>
                            <p>Êtes-vous sûre de vouloir supprimer ?</p>
                        </Form>
                    </Modal>
                }

            </div>
        );
    }
}
 
export default Hotels;