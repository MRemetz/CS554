import React, { Component } from 'react';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            age: null,
            gender: "",
            parents: {
                pf: "",
                pl: "",
                mf: "",
                ml: ""
            },
            username: "",
            password: ""
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div class="text-left">
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#signUpForm" onClick={this.props.function}>
                    Sign Up Here
                </button>

                <div class="modal fade" id="signUpForm" tabIndex="-1" role="dialog" aria-labelledby="signUpTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="signUpTitle">Sign Up Below</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <h2>Father:</h2>
                                        <label for="p1firstname">First Name:</label>
                                        <input type="text" class="form-control" id="p1firstname" placeholder="Enter your first name" value={this.state.parents.pf} onChange={this.handleChange} />
                                        <label for="p1lastname">Last Name:</label>
                                        <input type="text" class="form-control" id="p1lastname" placeholder="Enter your last name" value={this.state.parents.pl} onChange={this.handleChange} />
                                        <h2>Mother:</h2>
                                        <label for="p2firstname">First Name:</label>
                                        <input type="text" class="form-control" id="p2firstname" placeholder="Enter your first name" value={this.state.parents.mf} onChange={this.handleChange} />
                                        <label for="p2lastname">Last Name:</label>
                                        <input type="text" class="form-control" id="p2lastname" placeholder="Enter your last name" value={this.state.parents.ml} onChange={this.handleChange} />
                                        <h2>Your Info:</h2>
                                        <label for="firstname">First Name:</label>
                                        <input type="text" class="form-control" id="firstname" placeholder="Enter your first name" value={this.state.firstname} onChange={this.handleChange} />
                                        <label for="lastname">Last Name:</label>
                                        <input type="text" class="form-control" id="lastname" placeholder="Enter your last name" value={this.state.lastname} onChange={this.handleChange} />
                                        <label for="age">Age:</label>
                                        <input type="number" class="form-control" id="age" value={this.state.age} onChange={this.handleChange} />
                                        <label for="gender">
                                            Gender:
                                            <select value={this.state.gender} onChange={this.fileChange}>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </label>
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                    <button type="reset" class="btn btn-secondary">Reset</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
export default Signup;