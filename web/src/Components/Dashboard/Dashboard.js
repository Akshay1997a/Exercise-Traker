import React, { Component } from 'react'
import Exercises from '../Exercises/Exercises'
import { fetchData } from '../../Network/fetch'
import { logoutUrl } from '../../config/urls'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import "./Dashboard-style.scss"

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username
        }

        this.logout = this.logout.bind(this)
    }

    logout = async () => {
        const { history } = this.props

        var resposce = await fetchData(logoutUrl, "GET")
        if (resposce.result === 'ok') {
            history.push('/')
        } else {
            alert('err')
        }
    }

    render() {
        return (
            <div>
                <Navbar className="nav-bg">
                    <Navbar.Brand id="brand">KeepIt</Navbar.Brand>
                    <Nav.Link className="ml-auto">
                        <button className="logout-btn" title="Logout" onClick={this.logout}><i className="fa fa-power-off"></i></button>
                    </Nav.Link>
                </Navbar>
                <Exercises username={this.state.username} />
            </div>
        )
    }
}