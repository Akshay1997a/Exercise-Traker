import React, { useState } from 'react'
import { userSignupUrl } from '../../config/urls'
import { fetchData } from '../../Network/fetch'
import { Button, Checkbox, FormControlLabel, TextField } from '@material-ui/core'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./signup-style.scss"

export default function Signin() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")
    const [isRememberMe, setIsRememberMe] = useState(false)
    const [user_err_msg, setUserErrorMessage] = useState("")
    const [pass_err_msg, setPasswordErrorMessage] = useState("")
    const [cnf_pass_err_msg, setCnfPasswordErrorMessage] = useState("")

    var validate = () => {
        if (password.length < 8) {
            setUserErrorMessage("")
            setPasswordErrorMessage("minimum length mush be 8 or more")
            setCnfPasswordErrorMessage("")
            return false
        }
        else if (password !== cnfPassword) {
            setUserErrorMessage("")
            setPasswordErrorMessage("")
            setCnfPasswordErrorMessage("password not matched!")
            return false
        }
        else {
            return true
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        var userData = {
            username: username,
            password: password
        }
        if (validate()) {
            const responce = await fetchData(userSignupUrl, "POST", userData)
            if (responce.result === 'ok') {
                window.location.href = "/dashboard/"
            }
            else {
                setUserErrorMessage(responce.user_err_msg)
                setPasswordErrorMessage(responce.pass_err_msg)
            }
        }
    }

    return (
        <Container fluid="true"> 
            <Row className="sec-box-signin">
                <Col sm={12}  className="head">
                    <h1>Welcome</h1>
                </Col>
                <Col sm={12}>
                    <form onSubmit={handleSubmit}>
                        User Name: <br />
                        <input type="text" name="username" value={username} onChange={(evt) => { setUsername(evt.target.value) }} />
                        <p className="error">{user_err_msg}</p>
                        Password: <br />
                        <input type="password" name="password" value={password} onChange={(evt) => { setPassword(evt.target.value) }} />
                        <p className="error">{pass_err_msg}</p>
                        Confirm Password:<br />
                        <input type="password" name="cnfPassword" value={cnfPassword} onChange={(evt) => { setCnfPassword(evt.target.value) }} />
                        <p className="error">{cnf_pass_err_msg}</p>
                        <Row>
                            <Col xs={8} className="rememberMeBut">
                                <FormControlLabel id="checkbox"
                                    control={
                                        <Checkbox id="checkbox" color="primary" type="checkbox" name="isRememberMe" checked={isRememberMe}
                                            onChange={(evt) => {
                                                setIsRememberMe(!evt.target.value)
                                            }} />
                                    }
                                    label="Remember Me" />
                            </Col>
                            <Col xs={4}>
                                <Button className="but" variant="contained" color="primary" onClick={(event) => {handleSubmit(event) }}>Sigin in</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
                <Col className="col-lg-12 footer">
                    <Button id="linkBut" color="primary" href="/login">Already have an account?</Button>
                </Col>
            </Row>
        </Container>
    )
}