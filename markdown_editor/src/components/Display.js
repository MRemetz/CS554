import React from "react";
var Markdown = require("react-remarkable");Markdown

class MdPreview extends React.Component{
    render() {
        return(
            <div>
                <Markdown source="**Markdown**" />
            </div>
        );
    }
}
export default MdPreview;
