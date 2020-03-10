import React, { Component } from 'react';
import axios from 'axios';
import Card from '../Card/Card'

class ManageVisitor extends Component {
    state = {
        users: [],
        showForm: false
    }
    componentWillMount() {
        axios.get('http://35.180.37.72:3001/users/').then((response) => {
            this.setState({
                users: response.data
            })
        })
    }
    editUser = (name) => {
        console.log(name)
    }
    toggleForm = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }
    render() {
        const { users, showForm } = this.state
        let Allusers = users.map((user, id) => {
            return <Card key={id} user={user} editUser={() => this.editUser(user.nom)} />
        })
        return (
            <div className="planificateur-container">
                {showForm &&
                    <>
                        <div className="backgroundBody"></div>
                        <div className="addForm">
                            <form>
                                <input type="text" />
                                <span onClick={this.toggleForm}>X</span>
                            </form>
                        </div>
                    </>
                }
                <div className="flex-container">
                    <p>{users.length} planificateurs</p>
                    <button onClick={this.toggleForm}>Ajouter un planificateur</button>
                </div>
                {Allusers}
            </div>
        );
    }
}

export default ManageVisitor;