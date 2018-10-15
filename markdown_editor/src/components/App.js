import React from "react";
import MarkdownContainer from "./MdContainer.js"

export default function App() {
    return (
        <div>
            <main role="main">
                <div className="jumbotron">
                    <h1 className="display-4">Markdown Note Editor</h1>
                    <h2>by Max Remetz</h2>
                </div>
                <div className="container">
                    <MarkdownContainer />
                </div>
            </main>
        </div>
    );
}
