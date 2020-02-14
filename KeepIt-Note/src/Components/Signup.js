import React, { Component } from 'react'
import { userSignupUrl } from '../config/urls'
import { fetchData } from '../Network/fetch'

export default class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            cnfPassword: "",
            user_err_msg: "",
            pass_err_msg: "",
            cnf_pass_err_msg: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validate() {
        if (this.state.password.length < 8) {
            this.setState({ user_err_msg: "", pass_err_msg: "minimum length mush be 8 or more", cnf_pass_err_msg: "" })
            return false
        }
        else if (this.state.password !== this.state.cnfPassword) {
            this.setState({ user_err_msg: "", pass_err_msg: "", cnf_pass_err_msg: "password not matched!" })
            return false
        }
        else {
            return true
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        var userData = {
            username: this.state.username,
            password: this.state.password
        }
        if (this.validate()) {
            const responce = await fetchData(userSignupUrl, "POST", userData)
            if (responce.result === 'ok') {
                window.location.href = "/dashboard/"
            }
            else {
                this.setState({
                    user_err_msg: responce.user_err_msg,
                    pass_err_msg: responce.pass_err_msg
                })
            }
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
                            Confirm Password:<br />
                            <input type="password" name="cnfPassword" value={this.state.cnfPassword} onChange={this.handleChange} />
                            <p className="error">{this.state.cnf_pass_err_msg}</p>
                            <button>Sing up</button>
                        </form>
                    </div>
                    <div className="col-lg-12 footer">
                        <a href="/login">Already have an account?</a>
                    </div>
                </div>
            </header>
        )
    }
}