import React from 'react'

export default class EditExercise extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            descriiption: "",
            date: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.setState({
            title: this.props.title,
            descriiption: this.props.descriiption,
            date: this.props.date
        })
    }

    handleChange = (event)=>[
        this.setState({
            [event.targer.name] : event.target.value
        })
    ]

    render() {
        return (
            <div className="col-lg-8 right-container">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Title" className="input title" name="title" value={this.state.title} onChange={this.handleChange}></input>
                    <textarea name="desc" placeholder="Descriiption" className="input desc" value={this.state.desc} onChange={this.handleChange}></textarea><br />
                    <input type="date" className="input date" name="date" value={this.state.date} onChange={this.handleChange}></input>
                    <button className="input-but">Edit</button>
                </form>
            </div>
        )
    }
}