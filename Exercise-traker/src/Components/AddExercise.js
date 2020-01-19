import React from 'react'

export default class AddExercise extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: "",
            description: "",
            duration: "",
            date: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (event)=>{
        event.preventDefault()
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event)=>{
        event.preventDefault()
        fetch("http://localhost:5000/exercise/add/"+this.props.match.params.user,{
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then((resJson)=>{
            console.log(resJson)
            if(resJson.result == 'ok') {alert('Item added')}
        })
        .catch((err)=>{console.log(err)})
    }
    
    render(){
        return (
            <header className="container-fluid">
                <div className="row sec-box">
                    <div className="col-lg-12 head">
                        <h1>Add Exercies</h1>
                    </div>
                    <div className="col-lg-12 section">
                        <form onSubmit={this.handleSubmit}>
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