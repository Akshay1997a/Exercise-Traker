import React, { useState } from 'react'
import { fetchData } from '../../Network/fetch'
import { Button, Checkbox, FormControlLabel } from '@material-ui/core'
import { userLoginUrl } from '../../config/urls'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./Login-style.scss"

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isRememberMe, setIsRememberMe] = useState(false)
    const [user_err_msg, setUserErrorMessage] = useState("")
    const [pass_err_msg, setPasswordErrorMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        var userData = { username: username, password: password, isRememberMe: isRememberMe }
        const responce = await fetchData(userLoginUrl, "POST", userData)
        if (responce.result === 'ok') {
            window.location.href = "/dashboard"
        }
        else {
            setUserErrorMessage(responce.user_err_msg)
        }
    }

    return (
        <Container fluid="true">
            <Row className="sec-box">
                <Col xl={12} className="head">
                    <h1>Welcome</h1>
                </Col>
                <Col xl={12} className="section">
                    <form onSubmit={handleSubmit}>
                        User Name:<br />
                        <input type="text" name="username" value={username} onChange={(evt) => { setUsername(evt.target.value) }} />
                        <p className="error">{user_err_msg}</p>
                        Password: <br />
                        <input type="password" name="password" value={password} onChange={(evt) => { setPassword(evt.target.value) }} />
                        <p className="error">{pass_err_msg}</p>
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
                                <Button variant="contained" color="primary" onClick={(event) => {handleSubmit(event) }}>Log in</Button>
                            </Col>
                        </Row>
                    </form>
                </Col>
                <Col sm={12} className="footer">
                    <Button id="linkBut" color="primary" href="/">Don't have an account?</Button>
                </Col>
            </Row>
        </Container>
    )
}