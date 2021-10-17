import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Exercise = (props) => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>{props.exercise.duration}</td>
            <td><Link to={'/edit/'+props.exercise._id}>Edit</Link>|<a href='#' onClick={()=>props.deleteExercise(props.exercise._id)}>Delete</a></td>
        </tr>
    )
}

export default class ExercisesList extends React.Component {
    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = {
            exercises : [],
        }
    }
    deleteExercise(id) {
        const exercises = this.state.exercises;
        axios.delete('http://localhost:5000/exercises/' + id).then(res => {
            this.setState({
                exercises : exercises.filter((el) => el._id !== id),
            })
        }).catch(err => console.log(err));
    }
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/').then(res => {
            this.setState({
                exercises : res.data,
            });
        })
    }
    render() {
        return(
            <div>
                <h3>Logged Exercises</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }

    exerciseList() {
        return this.state.exercises.map((currentExercise) => 
         <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} 
                    key={currentExercise._id} />
        )
    }
   
}