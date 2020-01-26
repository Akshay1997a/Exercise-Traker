import React, { Component } from 'react'
import {Link} from 'react-router-dom'

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

    validate(){
        if(this.state.password.length < 8){
            this.setState({pass_err_msg: "minimum length mush be 8"})
            return false
        }
        else if(this.state.password != this.state.cnfPassword){
            this.setState({cnf_pass_err_msg: "password not matched!"})
            return false
        }
        else{
            return true
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.validate()) {
            fetch("http://localhost:5000/user/signup", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: this.state.username, password: this.state.password})
            })
                .then((res) => { return res.json() })
                .then((resJson) => {
                    if (resJson.result == 'ok') {
                        alert('ok')
                    }
                    else {
                        this.setState({
                            user_err_msg: resJson.user_err_msg,
                            pass_err_msg: resJson.pass_err_msg
                        })
                    }
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
                        <form  onSubmit={this.handleSubmit}>
                            User Name:<br />
                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                            <p className="error">{this.state.user_err_msg}</p>
                            Password: <br />
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                            <p className="error">{this.state.pass_err_msg}</p>
                            Confirm Password:<br />
                            <input type="password" name="cnfPassword" value={this.state.cnfPassword} onChange={this.handleChange} />
                            <p className="error">{this.state.cnf_pass_err_msg}</p>
                            <Link to="/dashboard">
                                <button>Sing up</button>
                            </Link>
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