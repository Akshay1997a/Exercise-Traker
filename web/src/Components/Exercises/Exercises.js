import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import { init, getUser } from '../../Controller/Controller'
import { Fab } from '@material-ui/core'
import { TaskView, Headline, AddExercise, EditExercise, ExerciseLoading, TaskList, Error } from '../TaskView/TaskView'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "./Exercises-style.scss"


export default class Exercises extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            error: false,
            isLoading: true,
            title: "",
            desc: "",
            date: "",
            _id: "",
            tasks: [],
            addExer: false,
            editExer: false
        }
        init(this)
    }

    async componentDidMount() {
        getUser()
    }

    AddItem = () => {
        if (this.state.addExer || this.state.editExer) {
            if (this.state.addExer) {
                return <AddExercise obj={this} />
            } else if (this.state.editExer) {
                return <EditExercise obj={this} title={this.state.title} desc={this.state.desc} date={this.state.date} />
            }
        }
        else {
            if (this.state.title === "" && this.state.desc === "") {
                return <Headline />
            } else {
                return <TaskView title={this.state.title} desc={this.state.desc} date={this.state.date} obj={this} />
            }
        }
    }

    render() {
        const { error, isLoading } = this.state
        if (error) {
            return <Error />
        } else if (isLoading) {
            return <ExerciseLoading />
        }
        else {
            return (
                <Container fluid="true" className="container">
                    <Row className="row sec-box-exercise">
                        <Col sm={12} className="head-exercise">
                            <h4>{this.state.username}</h4>
                        </Col>
                        <Col lg={4} className="list">
                            <Col lg={12} className="scroll">
                                {this.state.tasks.map((item, index) => (
                                    TaskList(item, index, this)
                                ))}
                                <button className="btn-add" onClick={() => { this.setState({ title: "", desc: "", date: "", addExer: !this.state.addExer, editExer: false }) }}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </Col>
                        </Col>
                        <this.AddItem />
                    </Row>
                </Container>
            )
        }
    }
}