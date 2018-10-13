import React from "react";

class MarkdownForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        const value = this.props.input;

        return (
            <form onSubmit={this.handleSubmit}>
                <div id="textarea">
                    <textarea input type="text" onChange={value} rows="15" cols="35"/>
                </div>
                <input type="submit" value="Save" />
            </form>
        );
    }
}

export default MarkdownForm;
