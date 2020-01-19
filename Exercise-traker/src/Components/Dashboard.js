import React,{Component} from 'react'
import Navi from './Navi'
import AddExercise from './AddExercise'
import EditExercise from './EditExercise'

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
                <Navi username={this.state.username}/>
                <h1>Welcome</h1>
                <h1>{this.state.username}</h1>
            </div>
        )
    }
}