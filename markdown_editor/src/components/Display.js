import React from "react";
import MarkdownEditor from "./Editor.js";

var Markdown = require("react-remarkable");

class MdPreview extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <Markdown source={this.props.value} />
            </div>
        );
    }
}

export default MdPreview;
