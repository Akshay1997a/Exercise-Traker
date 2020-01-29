import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import { fetchData } from '../Network/fetch';
import { addExercise, getExercise, dashboardUrl } from '../config/urls'

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
            tasks: [],
            addExer: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    getUser = async () => {
        var responce = await fetchData(dashboardUrl, "POST")
        if (responce.result === 'ok') {
            this.setState({ username: responce.username })
            var responce = await fetchData(getExercise + this.state.username, "GET")

            if (responce.result === 'ok') {
                this.setState({
                    isLoading: false,
                    tasks: responce.data
                })
            }
        }
        else {
            alert(responce.err)
            window.location.href = '/login'
        }
    }

    async componentDidMount() {
        this.getUser()
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        var exerciseData = {
            username: this.state.username,
            title: this.state.title,
            description: this.state.desc,
            date: this.state.date
        }

        var responce = await fetchData(addExercise + this.state.username, "POST", exerciseData)

        if (responce.result === 'ok') {
            alert('item added')
            this.setState({ addExer: false, tass: this.state.tasks.push(exerciseData) })
        }
        else {
            alert('err')
        }
    }

    Tasks(item, index) {
        return (
            <button key={index} className="exerciseContainer" onClick={() => { this.setState({ title: item.title, desc: item.description, date: item.date, addExer: false }) }}>
                <div className="">
                    <h3>{item.title}</h3>
                </div>
                <div className="">
                    <h6>{item.description}</h6>
                </div>
            </button>
        )
    }

    AddItem = () => {
        if (!this.state.addExer) {
            if (!this.state.title == "") {
                return (
                    <div className="col-lg-8 right-container">
                        <p placeholder="Title" className="input title">{this.state.title}</p>
                        <p className="input desc">{this.state.desc}</p>
                        <p className="input date">{this.state.date}</p>
                        <button className="btn-edit" onClick={() => { this.setState({ addExer: !this.state.addExer }) }}>
                            <i className="fa fa-edit"></i>
                        </button>
                    </div>
                )
            }
            else {
                return (
                    <div className="col-lg-8 brand-screen">
                        <h1 className="welcome-heading">Welcome</h1>
                        <h1 className="name-brand">KeepIt</h1>
                        <br />
                        <p className="paragraph">Never miss your note anymore!</p>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="col-lg-8 right-container">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Title" className="input title" name="title" value={this.state.title} onChange={this.handleChange}></input>
                        <textarea name="desc" placeholder="Descriiption" className="input desc" value={this.state.desc} onChange={this.handleChange}></textarea><br />
                        <input type="date" className="input date" name="date" value={this.state.date} onChange={this.handleChange}></input>
                        <button className="input-but">Add</button>
                    </form>
                </div>
            )
        }
    }

    render() {
        const { error, isLoading } = this.state
        if (error) {
            return (
                <header className="container-fluid">
                    <div className="row sec-box-exercise">
                        <div className="col-lg-12 head">
                            <h1>Exercises</h1>
                        </div>
                        <div className="scroll">
                            <p>Something goes wrong!!</p>
                        </div>
                    </div>
                </header>
            )
        } else if (isLoading) {
            return (
                <header className="container-fluid">
                    <div className="row sec-box">
                        <div className="col-lg-12 head">
                            <h1>Exercises</h1>
                        </div>
                        <div className="scroll">
                            <h4>Loading...</h4>
                        </div>
                    </div>
                </header>
            )
        }
        else {
            return (
                <header className="container-fluid">
                    <div className="row sec-box-exercise">
                        <div className="col-lg-12 head-exercise">
                            <h4>{this.state.username}</h4>
                        </div>
                        <div className="col-lg-4 list">
                            <div className="scroll">
                                {this.state.tasks.map((item, index) => (
                                    this.Tasks(item, index)
                                ))}
                                <button className="btn-add" onClick={() => { this.setState({ title: "", desc: "", date: "", addExer: !this.state.addExer }) }}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <this.AddItem />
                    </div>
                </header>
            )
        }
    }
}