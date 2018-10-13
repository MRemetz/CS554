import React from "react";
import MarkdownEditor from "./Editor.js";

var Markdown = require("react-remarkable");

class MdPreview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mdtext: this.props.mdText
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mdText !== this.props.mdText){
            this.setState({
                mdText: this.props.mdText
            });
        }
    }

    render() {
        return(
            <div>
                <Markdown source={this.props.mdText} />
            </div>
        );
    }
}

export default MdPreview;
