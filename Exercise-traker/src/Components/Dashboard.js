import React, { Component } from 'react'
import Exercises from './Exercises'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: localStorage.getItem('userAuth')
        }

        this.logout = this.logout.bind(this)
    }

    logout = () => {
        const { history } = this.props

        localStorage.removeItem('userAuth')
        history.push('/')
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