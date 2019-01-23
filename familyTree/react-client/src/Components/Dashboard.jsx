import React, { Component } from 'react';

class Dashboard extends Component {
    goTo(route) {
        this.props.history.replace(`/${route}`)
      }
    
      login() {
        this.props.auth.login();
      }
    
      logout() {
        this.props.auth.logout();
      }
    
      componentDidMount() {
        const { renewSession } = this.props.auth;
    
        if (localStorage.getItem('isLoggedIn') === 'true') {
          renewSession();
        }
      }
    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        this.setState({
            email: event.target.value
        });
    }
    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                <main role="main">
                    <div className="jumbotron">
                        <div className="container">
                            <h1 className="display-3"> Welcome to Your Family Tree</h1>
                            <p>Our application allows you to trace your patrilineal or matrilineal line (mothers side or fathers side) and explore your heritage.</p>
                            <p>Please login in order to begin your journey and don't forget to tell your family to join
                            <br/>
                            <label>Reccomend a friend! Enter email: <input type='text' onChange={this.handleChange} value={this.state.email}></input></label><a id="sendEmail" href={`mailto:${this.state.email}?subject=Learn%20Your%20Family%20Tree&amp;body=Come%20join%20me%20at%20localhost:3000%20and%20make%20your%20family%20tree!`}> and then click here!</a></p>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary" onClick={this.goTo.bind(this)}>
                        Home
                    </button>
                    { !isAuthenticated() && (
                        <button type="button" class="btn btn-primary" onClick={this.login.bind(this)}>
                        Log In here
                        </button>
                    )}
                    { isAuthenticated() && (
                        <button type="button" class="btn btn-primary" onClick={this.logout.bind(this)}>
                        Log Out here
                        </button>
                    )}
                </main>
            </div>
        );
    };
};
export default Dashboard;
