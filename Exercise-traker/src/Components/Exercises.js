import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom';

export default class Exercises extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            error: false,
            isLoading: false,
            title: "",
            desc: "",
            date: "",
            tasks: [],
            addExer: false
        }

        this.addItem = this.addItem.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({ username: this.props.username })
        fetch("http://localhost:5000/exercise/" + this.state.username, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((resJson) => { this.setState({ isLoading: false, tasks: resJson }); console.log(this.state.tasks) })
            .catch((err) => { console.log(err) })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:5000/exercise/add/" + this.state.username, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                title: this.state.title,
                description: this.state.desc,
                date: this.state.date
            })
        })
            .then(res => res.json())
            .then((resJson) => { if (resJson.result == 'ok') alert('item added') })
            .catch((err) => { alert('error') })
    }

    Tasks(item) {
        return (
            <button className="exerciseContainer" onClick={() => { this.setState({ title: item.title, desc: item.description, date: item.date, addExer: false }) }}>
                <div className="">
                    <h3>{item.title}</h3>
                </div>
                <div className="">
                    <h6>{item.description}</h6>
                </div>
            </button>
        )
    }

    addItem() {
        if (!this.state.addExer) {
            if (!this.state.title == "") {
                return (
                    <div className="col-lg-8 right-container">
                        <p placeholder="Title" className="input title">{this.state.title}</p>
                        <p className="input desc">{this.state.desc}</p>
                        <p className="input date">{this.state.date}</p>
                        <button className="btn-edit">
                            <i class="fa fa-edit"></i>
                        </button>
                    </div>
                )
            }
            else {
                return (
                    <div className="col-lg-8 brand-screen">
                        <h1 className="welcome-heading">Welcome</h1>
                        <h1 className="name-brand">KeepIt</h1>
                        <br/>
                        <p className="paragraph">Never miss your note anymore!</p>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="col-lg-8 right-container">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Title" className="input title" name="title" onChange={this.handleChange}></input>
                        <textarea name="desc" placeholder="Descriiption" className="input desc" onChange={this.handleChange}></textarea><br />
                        <input type="date" className="input date" name="date" onChange={this.handleChange}></input>
                        <button className="input-but">Add</button>
                    </form>
                </div>
            )
        }
    }

    render() {
        const { error, isLoading, tasks } = this.state
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
                <header className="container">
                    <div className="row sec-box-exercise">
                        <div className="col-lg-12 head-exercise">
                            <h4>Akshay123</h4>
                        </div>
                        <div className="col-lg-4 list">
                            <div className="scroll">
                                {this.state.tasks.map((item, index) => (
                                    //<Tasks item={item} key={index}/>
                                    this.Tasks(item, index)
                                ))}
                                <Link>
                                    <button className="btn-add" onClick={() => { this.setState({ addExer: !this.state.addExer }) }}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {this.addItem()}
                    </div>
                </header>
            )
        }
    }
}