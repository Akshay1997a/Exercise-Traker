import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'

class Navi extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="navbar-brand">
                    <h2>KeepIt</h2>
                </div>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to={"/dashboard/" +this.props.username+ "/exercises"}>
                            <a className="nav-link">Exercises</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/dashboard/"+this.props.username+"/add"}>
                            <a className="nav-link">Add Exercise</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/dashboard/"+this.props.username+"/edit"}>
                            <a className="nav-link">Edit Exercises</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/dashboard/"+this.props.username+"/delete"}>
                            <a className="nav-link">Delete Exercises</a>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Navi