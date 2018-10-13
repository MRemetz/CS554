import React from "react";

class MarkdownForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const value = this.props.textInput;

        return (
                <div id="textarea">
                    <textarea type="text" onChange={value} rows="15" cols="35"/>
                </div>
        );
    }
}

export default MarkdownForm;
