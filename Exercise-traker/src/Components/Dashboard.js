import React,{Component} from 'react'
import AddExercise from './AddExercise'
import EditExercise from './EditExercise'
import Exercises from './Exercises'

export default class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: this.props.match.params.user
        }
    }

    render(){
        return(
            <div className="head">
                <nav className="navbar bg-dark">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand">KeepIt</a>
                        </div>
                    </div>
                </nav>
                <Exercises username={this.state.username}/>
            </div>
        )
    }
}