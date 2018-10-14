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

    render() {
        return(
            <>
                <Markdown source={this.props.mdText} />
            </>
        );
    }
}

export default MdPreview;
