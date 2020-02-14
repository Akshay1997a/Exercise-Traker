import React, { Component } from 'react'
import Exercises from './Exercises'
import { fetchData } from '../Network/fetch'
import { logoutUrl } from '../config/urls'

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
            <div className="head">
                <nav className="navbar bg-dark">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">KeepIt</a>
                        </div>
                        <div>
                            <button className="logout-btn" title="Logout" onClick={this.logout}><i className="fa fa-power-off"></i></button>
                        </div>
                    </div>
                </nav>
                <Exercises username={this.state.username} />
            </div>
        )
    }
}