import React from 'react'

export default class EditExercise extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: "",
            description: "",
            duration: "",
            date: ""
        }
    }

    handleChange = (event)=>{
        event.preventDefalut()
        this.setState({[event.target.name]: event.target.value})
    }
    
    render(){
        return (
            <header className="container-fluid">
                <div className="row sec-box">
                    <div className="col-lg-12 head">
                        <h1>Edit Exercies</h1>
                    </div>
                    <div className="col-lg-12 section">
                        <form>
                            Description: <br/>
                            <input type="text" name="description" onChange={this.handleChange} />
                            <p className="error"></p>
                            Duration:
                            <input type="text" name="duration" onChange={this.handleChange} />
                            <p className="error"></p>
                            Date:
                            <input type="date" name="date" onChange={this.handleChange} />
                            <p className="error"></p>
                            <button>Add</button>
                        </form>
                    </div>
                </div>
            </header>
        )
    }
}