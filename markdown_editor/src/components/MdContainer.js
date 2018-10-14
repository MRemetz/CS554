import React from 'react';
import ReactDOMServer from "react-dom/server";
import MarkdownForm from "./Editor";
import MdPreview from "./Display.js";

var Remarkable = require('remarkable');
var md = new Remarkable();


class MardownContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            markdown: null,
            value: "html"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateMarkdown = event => {
        this.setState({markdown: event.target.value});
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const markdown = this.state.markdown;
        if (!markdown){
            alert("Input is currently empty. Enter text into editor before downloading to file")
        }
        else {
            const filetype = this.state.value;
            if (filetype == "html"){
                var str = md.render(markdown)
                console.log(str);
            }
            else{
                console.log(markdown);
            }
        }
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
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Save file as:
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option value="html">.html</option>
                                <option value="markdown">.md</option>
                            </select>
                        </label>
                        <input type="submit" value="Download" />
                    </form>
                </div>
            </div>
        );
    }
}

export default MardownContainer;
