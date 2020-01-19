import React from 'react'

export default class Exercises extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoading: true,
            tasks: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/exercise/" + this.props.match.params.user, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((resJson) => {this.setState({isLoading: false, tasks: resJson}); console.log(this.state.tasks)})
            .catch((err) => { console.log(err) })
    }

    render() {
        const { error, isLoading, tasks } = this.state
        if (error) {
            return (
                <header className="container-fluid">
                    <div className="row sec-box">
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
                <header className="container-fluid align-self-center">
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
                        <div className="col-lg-12 head">
                            <h1>Exercises</h1>
                        </div>
                        <div className="scroll">
                            {this.state.tasks.map((item, index)=>(
                                <Tasks item={item} key={index}/>
                            ))}
                        </div>
                    </div>
                </header>
            )
        }
    }
}

function Tasks({item}){
    return (
        <div className="exerciseContainer">
            <div className="">
                <h3>{item.description}</h3>
            </div>
            <div className="">
                <h6>{item.duration}</h6>
            </div>
            <div className="">
                <h6>{item.date}</h6>
            </div>
        </div>
    )
}