import React from "react";
import MarkdownForm from "./Editor";
import MdPreview from "./Display.js";

export default function App() {
    return (
        <div>
            <main role="main">
                <div class="jumbotron">
                    <h1 className="display-4">Markdown Note Editor</h1>
                    <h4>by Max Remetz</h4>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1>Markdown:</h1>
                            <h5>Edit markdown here and click 'save' to download to a file</h5>
                            <MarkdownForm />
                        </div>
                        <div className="col-md-6">
                            <h1>Preview:</h1>
                            <h5>Preview of how your markdown file will appear</h5>
                            <MdPreview />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
