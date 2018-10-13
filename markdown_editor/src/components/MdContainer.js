import React from 'react';
import MarkdownForm from "./Editor";
import MdPreview from "./Display.js";

class MardownContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            markdown: "Enter text Here"
        };
    }

    updateMarkdown = event => {
        this.setState({markdown: event.target.value});
    }

    render() {
        const markdown = this.state.markdown;

        return (
            <div className="row">
                <div className="col-md-6">
                    <h1>Markdown:</h1>
                    <h5>Edit markdown here and click 'save' to download to a file</h5>
                    <MarkdownForm input={this.updateMarkdown} />
                </div>
                <div className="col-md-6">
                    <h1>Preview:</h1>
                    <h5>Preview of how your markdown file will appear</h5>
                    <MdPreview mdText={this.state.markdown} />
                </div>
            </div>
        );
    }
}

export default MardownContainer;
