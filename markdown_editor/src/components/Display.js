import React from "react";
import MarkdownEditor from "./Editor.js";

var Markdown = require("react-remarkable");

class MdPreview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mdtext: this.props.mdText
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <Markdown source={this.props.mdText} />
                </div>
                <input type="submit" value="Save" />
            </form>
        );
    }
}

export default MdPreview;
