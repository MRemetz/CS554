import React from 'react';
import ReactDOMServer from "react-dom/server";
import MarkdownForm from "./Editor";
import MdPreview from "./Display.js";

class MardownContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            markdown: null
        };
        this.htmlSubmit = this.htmlSubmit.bind(this);
        this.markdownSubmit = this.markdownSubmit.bind(this);
    }

    updateMarkdown = event => {
        this.setState({markdown: event.target.value});
    }

    htmlSubmit(event) {
        event.preventDefault();
        console.log(event.target);
        const str = ReactDOMServer.renderToString(<MdPreview mdText={this.state.markdown} />);
        console.log(str);
    }

    markdownSubmit(event) {
        event.preventDefault();
        console.log(event.target);
        const str = ReactDOMServer.renderToString(<MdPreview mdText={this.state.markdown} />);
        console.log(str);
    }

    render() {
        const markdown = this.state.markdown;

        return (
            <div className="row">
                <div className="col-md-6">
                    <h1>Markdown:</h1>
                    <h5>Edit markdown here and click 'save' to download to a file</h5>
                    <MarkdownForm textInput={this.updateMarkdown} />
                </div>
                <div className="col-md-6">
                    <h1>Preview:</h1>
                    <h5>Preview of how your markdown file will appear</h5>
                    <MdPreview mdText={this.state.markdown} />
                    <form onSubmit={this.markdownSubmit}>
                        <input type="submit" value="Save as Markdown File" />
                    </form>
                    <form onSubmit={this.htmlSubmit}>
                        <input type="submit" value="Save as HTML" />
                    </form>
                </div>
            </div>
        );
    }
}

export default MardownContainer;
