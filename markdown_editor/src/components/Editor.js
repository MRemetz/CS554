import React from "react";

class MarkdownForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '**Markdown**'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea value={this.state.value} onChange={this.handleChange} rows="15" cols="50"/>
                <br></br>
                <input type="submit" value="Save" />
            </form>
        );
    }
}

export default MarkdownForm;
