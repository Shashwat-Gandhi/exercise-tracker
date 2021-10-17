import React from 'react';
import {Link} from 'react-router-dom';

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
        this.setState({
            users : ['testUser'],
            username : 'test user',
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
        window.location = '/';
    }
    handleUsernameChange(e) {
        this.setState({
            username : e.target.value,
        })
    };
    handleDateChange(e) {
        this.setState({
            date : e.target.value,
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
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput" required className="form-control"
                                value={this.handleUsernameChange}>
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
                        <label>Duration: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.handleDurationChange}
                            />
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