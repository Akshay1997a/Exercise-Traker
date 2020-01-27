import React, { Component } from 'react'
import { fetchData } from '../Network/fetch'
import { userLoginUrl } from '../config/urls'

export default class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            user_err_msg: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        var userData = { username: this.state.username, password: this.state.password }
        const responce = await fetchData(userLoginUrl, "POST", userData)

        if (responce.result === 'ok') {
            localStorage.setItem('userAuth', this.state.username)
            window.open("/dashboard", "_top")
        }
        else {
            this.setState({
                user_err_msg: responce.user_err_msg,
            })
        }
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <header>
                <div className="row sec-box">
                    <div className="col-lg-12 head">
                        <h1>Welcome</h1>
                    </div>
                    <div className="col-lg-12 section">
                        <form onSubmit={this.handleSubmit}>
                            User Name:<br />
                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                            <p className="error">{this.state.user_err_msg}</p>
                            Password: <br />
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            <p className="error">{this.state.pass_err_msg}</p>
                            <button>Log in</button>
                        </form>
                    </div>
                    <div className="col-lg-12 footer">
                        <a href="/login">Don't have an account?</a>
                    </div>
                </div>
            </header>
        )
    }
}