import React from "react";
import MarkdownForm from "./Editor";

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
                            <h2>Text Area Here</h2>
                            <MarkdownForm />
                        </div>
                        <div className="col-md-6">
                            <h2>HTML Display</h2>
                            <MarkdownForm />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
