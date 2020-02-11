import { fetchData } from '../Network/fetch';
import { addExerciseUrl, getExerciseUrl, dashboardUrl, deleteExerciseUrl, editExerciseUrl } from '../config/urls'
import Exercises from '../Components/Exercises'

var refrence = null;

export function init(ref){
    refrence = ref
}

export async function getUser() {
    var responce = await fetchData(dashboardUrl, "POST")
    if (responce.result === 'ok') {
        refrence.setState({ username: responce.username })
        var responce = await fetchData(getExerciseUrl + refrence.state.username, "GET")

        if (responce.result === 'ok') {
            refrence.setState({
                isLoading: false,
                tasks: responce.data
            })
        }
    }
    else {
        window.location.href = '/login'
    }
}

export async function deleteTask(index) {
    var deleteData = {
        _id: refrence.state.tasks[index]._id
    }
    var responce = await fetchData(deleteExerciseUrl, "POST", deleteData)
    if (responce.result === 'ok') {
        alert('item deleted')
        getUser()
        refrence.setState({title: ""})
    }
    else {
        alert('oops')
    }
}

export function handleChange(event){
    refrence.setState({ [event.target.name]: event.target.value })
}

export async function editExercise(event) {
    event.preventDefault()
    var exerciseData = {
        _id: refrence.state._id,
        username: refrence.state.username,
        title: refrence.state.title,
        description: refrence.state.desc,
        date: refrence.state.date
    }

    var responce = await fetchData(editExerciseUrl + refrence.state.username, "POST", exerciseData)

    if (responce.result === 'ok') {
        alert('item edited')
        refrence.setState({ addExer: false})
        getUser()
    }
    else {
        alert('err')
    }
}

export async function addExercise(event) {
    event.preventDefault()
    var exerciseData = {
        username: refrence.state.username,
        title: refrence.state.title,
        description: refrence.state.desc,
        date: refrence.state.date
    }

    var responce = await fetchData(addExerciseUrl + refrence.state.username, "POST", exerciseData)

    if (responce.result === 'ok') {
        alert('item added')
        getUser()
        refrence.setState({addExer: !refrence.state.addExer, editExer: false})
    }
    else {
        alert('err')
    }
}