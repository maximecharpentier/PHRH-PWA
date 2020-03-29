import React, { Component } from 'react';

import Card from '../Common/Card/Card';
import Input from '../Common/Input/Input';
import Form from '../Common/Form/Form';
import Modal from '../Common/Modal/Modal';
import Nav from '../Common/Nav/Nav';

import API from '../../../api/api';


class ManageHotels extends Component {
    state = {
        hotels: [],
        newHotel: {},
        hotelInfos: {},
        editing: false,
        showForm: false,
        showDeleteConfirm: false,
        successMessage: "",
    }

    _refreshVisitors = () => {
        API.get('hotels/').then((response) => {
            this.setState({
                hotels: response.data
            })
        })
    }

    componentDidMount() {
        this._refreshVisitors()
    }

    componentDidUpdate() {
        !this.state.showForm ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden'
    }

    // addVisitor = (e) => {
    //     e.preventDefault();
    //     const { nom, prenom, secteur, infos_equipe } = e.target;
    //     if (nom.value !== "" && prenom.value !== "" && secteur.value !== "" && infos_equipe.value !== "") {
    //         API.post('users/add/', this.state.newVisitor).then((response) => {
    //             console.log(response.data)
    //             this.setState({
    //                 newVisitor: {
    //                     fonction: "Superviseur", plage_h: null, pwd: "null", nom: "", prenom: "", secteur: "", infos_equipe: ""
    //                 }
    //             })
    //             this._refreshVisitors()
    //             this.toggleForm();
    //             this.showSuccessMessage("L'utilisateur à bien été ajouter")
    //         }).catch(error => {
    //             console.log(error.response)
    //         });
    //     } else {
    //         this.setState({
    //             errorEmptyFieldsMessage: "L'un des champs n'est pas remplie"
    //         })
    //     }
    // }

    // getUserInfo = (user, editUser) => {
    //     editUser ? 
    //     this.setState({
    //         userInfos: user,
    //         editing: true,
    //         showForm: !this.state.showForm,
    //     })
    //     :
    //     this.setState({
    //         userInfos: user,
    //         showMore: !this.state.showMore,
    //     })
    // }

    // updateUser = (e, id) => {
    //     e.preventDefault();
    //     API.post('users/edit/' + id, this.state.userInfos).then((response) => {
    //         console.log(response.data)
    //         this._refreshVisitors()
    //         this.toggleForm();
    //         this.showSuccessMessage("L'utilisateur à bien été modifier")
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

    // deleteUser = (e) => {
    //     e.preventDefault()
    //     API.delete('users/delete/' + this.state.idVisitorClicked).then((response) => {
    //         console.log(response.data)
    //         this.toggleDeleteConfirmation()
    //         this._refreshVisitors()
    //         this.showSuccessMessage("L'utilisateur à bien été supprimer")
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
        }, 3000)
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.state.editing ? this.setState(prevState => ({
            userInfos: {
                ...prevState.userInfos,
                [name]: value
            }
        })) : this.setState(prevState => ({
            newVisitor: {
                ...prevState.newVisitor,
                [name]: value
            }
        }))

    }

    render() {
        const { showForm, showMore, hotels, newHotel, editing, hotelInfos, showDeleteConfirm, successMessage } = this.state;

        let allHotels = hotels.map((hotel) => {
            return <Card key={hotel._id} hotel={hotel} editHotel={() => this.getHotelInfo(hotel, true)} showMore={() => this.getHotelInfo(hotel)} deleteHotel={() => this.getIdForDelete(hotel._id)} />
        })

        return (
            <div className="hotel-container">

                <Nav items={hotels} addForm={this.toggleForm} name="hotel" />

                {successMessage !== "" && <div className="success-message">{successMessage}</div>}

                <section className="card-container">
                    {allHotels}
                </section>

                {/* {showForm &&
                    <Modal title={editing ? "Modifier un visiteur" : "Ajouter un visiteur"} handleClick={this.toggleForm}>
                        <Form btnSubmit="Valider" handleSubmit={editing ? (e) => this.updateUser(e, userInfos._id) : this.addVisitor} handleClick={this.toggleForm}>
                            <Input name="nom" type="text" value={editing ? userInfos.nom : newVisitor.nom || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="prenom" type="text" value={editing ? userInfos.prenom : newVisitor.prenom || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="secteur" type="text" value={editing ? userInfos.secteur : newVisitor.secteur || ''} handleChange={(e) => this.handleChange(e)} />
                            <Input name="infos_equipe" type="text" value={editing ? userInfos.infos_equipe : newVisitor.infos_equipe || ''} handleChange={(e) => this.handleChange(e)} />
                        </Form>
                    </Modal>
                }
                {showDeleteConfirm &&
                    <Modal handleClick={this.toggleDeleteConfirmation}>
                        <Form btnSubmit="Supprimer" handleSubmit={(e) => this.deleteUser(e)} handleClick={this.toggleDeleteConfirmation}>
                            <p>Êtes-vous sûre de vouloir supprimer ?</p>
                        </Form>
                    </Modal>
                } */}

            </div>
        );
    }
}
 
export default ManageHotels;