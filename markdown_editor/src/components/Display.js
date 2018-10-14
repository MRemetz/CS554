import React from "react";
import MarkdownEditor from "./Editor.js";

var Remarkable = require('remarkable');
var md = new Remarkable();

class MdPreview extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mdtext: this.props.mdText
        }
    }

    render() {
        const htmlObj = {__html: md.render(this.props.mdText)};
        return(
            <div dangerouslySetInnerHTML={htmlObj} />
        );
    }
}

export default MdPreview;
