import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

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

    handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:5000/user/login", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: this.state.username, password: this.state.password })
        })
            .then((res) => { return res.json() })
            .then((resJson) => {
                if (resJson.result == 'ok') {

                }
                else {
                    this.setState({
                        user_err_msg: resJson.user_err_msg,
                    })
                }
            })
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
                            <Link to={"/dashboard/"+this.state.username}>
                                <button>Log in</button>
                            </Link>
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