import React, { Component } from 'react'
import {Row, Col} from 'react-bootstrap'
import { Fab } from '@material-ui/core'
import { Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { addExercise, editExercise, handleChange, deleteTask, } from '../../Controller/Controller'
import "./TaskView-style.scss"

export function TaskView(props) {
    return (
        <Col lg={8} className="right-container">
            <p placeholder="Title" className="input title">{props.title}</p>
            <p className="input desc">{props.desc}</p>
            <p className="input date">{new Date(props.date).toDateString()}</p>
            <button className="btn-edit" onClick={() => { props.obj.setState({ editExer: !props.obj.state.editExer, addExer: false }) }} >
                <i className="fa fa-edit"></i>
            </button>
        </Col>
    )
}

export function Headline(props) {
    return (
        <Col lg={8} className="brand-screen">
            <h1 className="welcome-heading">Welcome</h1>
            <h1 className="name-brand">KeepIt</h1>
            <br />
            <p className="paragraph">Never miss your note anymore!</p>
        </Col>
    )
}

export function AddExercise(props) {
    return (
        <Col lg={8} className="right-container">
            <form onSubmit={addExercise}>
                <input type="text" placeholder="Title" className="input title" name="title" value={props.title} onChange={handleChange}></input>
                <textarea name="desc" placeholder="Descriiption" className="input desc" value={props.desc} onChange={handleChange}></textarea><br />
                <input type="date" placeholder="DD/MM/YYY" className="input date" name="date" onChange={handleChange}></input>
                <button className="input-but" onClick={addExercise} >Add</button>
            </form>
        </Col>
    )
}

export function EditExercise(props) {
    return (
        <Col lg={8} className="right-container">
            <form onSubmit={editExercise}>
                <input type="text" placeholder="Title" className="input title" name="title" value={props.title} onChange={handleChange}></input>
                <textarea name="desc" placeholder="Descriiption" className="input desc" value={props.desc} onChange={handleChange}></textarea><br />
                <input type="date" className="input date" name="date" value={new Date(props.date).toISOString().slice(0, 10).toString()} onChange={handleChange}></input>
                <button className="input-but">Edit</button>
            </form>
        </Col>
    )
}

export function ExerciseLoading(props) {
    return (
        <header className="container-fluid">
            <div className="row sec-box">
                <div className="col-lg-12 head">
                    <h1>Exercises</h1>
                </div> <br/>
                <CircularProgress color="primary"/>
            </div>
        </header>
    )
}

export function TaskList(item, index, obj) {
    return (
        <Row key={index} className="exerciseContainer active">
            <Col lg={10} className="left-tasklist-but" onClick={() => { obj.setState({ _id: item._id, title: item.title, desc: item.description, date: item.date, addExer: false, editExer: false }) }}>
                <div className="">
                    <h3>{item.title}</h3>
                </div>
                <div className="">
                    <h6>{item.description.slice(0, 40)}</h6>
                </div>
            </Col>
            <Col lg={2} className="right-tasklist-but" title="delete task" onClick={() => { deleteTask(index) }}>
                <div className="delBut"><i className="fa fa-trash-o"></i></div>
            </Col>
        </Row>
    )
}

export function Error(props) {
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
}