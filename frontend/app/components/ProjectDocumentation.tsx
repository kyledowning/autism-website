import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';

export default function ProjectDocumentation() {

    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        fetch("/README.md")
            .then((response) => response.text())
            .then((text) => setMarkdown(text));
    }, []);

    return (
        <div className='m-25 border-2 border-blue-500 rounded-lg shadow-md'>
            <div className="prose mx-20 markdown-body px-20 py-10">
                <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
        </div>
    );

}
