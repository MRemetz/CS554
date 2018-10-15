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
            filename: "Markdown_Note",
            filetype: ".html"
        };

        this.fileChange = this.fileChange.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.blobDownload = this.blobDownload.bind(this);
    }

    updateMarkdown = event => {
        this.setState({markdown: event.target.value});
    }

    fileChange(event) {
        this.setState({filetype: event.target.value});
    }

    nameChange(event) {
        this.setState({filename: event.target.value});
    }

    blobDownload(blob) {
        const filename = this.state.filename;
        const filetype = this.state.filetype;
        var blobURL = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = blobURL;
        a.download = filename.concat(filetype);
        document.body.appendChild(a);
        a.click();
    }

    handleSubmit(event) {
        event.preventDefault();
        const markdown = this.state.markdown;
        if (!markdown) {
            alert("Input is currently empty. Enter text into editor before downloading to file")
        }
        else {

            const filetype = this.state.filetype;

            if (filetype == ".html"){
                const htmlstr = md.render(markdown)
                var blob = new Blob([htmlstr], {type: 'text/html'});
                this.blobDownload(blob);
            }
            else{
                var blob = new Blob([markdown], {type: 'text/markdown'});
                var blobURL = URL.createObjectURL(blob);
                this.blobDownload(blob);
            }
        }
    }

    render() {
        const markdown = this.state.markdown;

        return (
            <div className="row">
                <div className="col-md-6">
                    <h1>Markdown:</h1>
                    <p>Edit markdown here:</p>
                    <MarkdownForm textInput={this.updateMarkdown} />
                </div>
                <div className="col-md-6">
                    <h1>Preview:</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Save file as:
                            <input type="text" value={this.state.filename} onChange={this.nameChange} />
                        </label>
                        <label>
                            <select value={this.state.filetype} onChange={this.fileChange}>
                                <option value=".html">.html</option>
                                <option value=".md">.md</option>
                            </select>
                        </label>
                        <input type="submit" value="Download" />
                    </form>
                    <MdPreview mdText={this.state.markdown} />
                </div>
            </div>
        );
    }
}

export default MardownContainer;
