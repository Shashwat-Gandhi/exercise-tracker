import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
export default class CreateExercise extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);

        this.state = {
            username : '',
            users : [],
            description : '', 
            date : new Date(),
            duration : 0,
        };
    }
    componentDidMount() {
        axios.get('http://localhost:5000/users/').then(res => {
            if(res.data.length > 0) {
                this.setState({
                    users : res.data.map((user) => user.username),
                    username : res.data[0].username,
                })
            }
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        
        const exercise = {
            username : this.state.username,
            description : this.state.description,
            duration : this.state.duration,
            date : this.state.date,
        };

        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add/', exercise).then(res=> console.log(res.data))
        .catch(err => console.log(err));
        
    }
    handleUsernameChange(e) {
        this.setState({
            username : e.target.value,
        })
    };
    handleDateChange(date) {
        this.setState({
            date :date,
        })
    };
    handleDurationChange(e) {
        this.setState ({
            duration : e.target.value,
        })
    };
    handleDescriptionChange(e) {
        this.setState({
            description : e.target.value,
        })
    };

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select  required className="form-control"
                                value={this.state.username} onChange={this.handleUsernameChange}>
                                    {this.state.users.map(function(user) {
                                        return <option key={user} value={user}>{user}</option>;
                                    })}
                         </select>
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input type="text" required className="form-control" 
                            value={this.state.description} onChange={this.handleDescriptionChange}
                            />
                    </div>
                    <div>
                        <label>Duration (in minutes): </label>
                        <input
                            type="number"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.handleDurationChange}
                            />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.handleDateChange}
                        />
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Create Exercise Log'
                                className='btn btn-primary'/>
                    </div>
                </form>
            </div>
        )
    }
}