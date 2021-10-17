import React from 'react';
import axios from 'axios';

export default class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username : '',
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const newUser = {
            username : this.state.username,
        }
        console.log(newUser);
        axios.post('http://localhost:5000/users/add', newUser).then(res => console.log(res.data));
        this.setState({
            username : '',
        })
    }
    handleUsernameChange(e) {
        this.setState({
            username : e.target.value,
        })
    }
    render() {
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" className="form-group"
                                required onChange={this.handleUsernameChange}
                                value={this.state.username}/>
                    </div>
                    <div className='form-group'>
                        <input type="submit" value="Create User"
                                className='btn btn-primary'/>
                    </div>
                </form>
            </div>
        )
    }
}