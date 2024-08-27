import React, {useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
    const [content, setContent] = useState("");

    return (
        <div className="container mx-auto p-8">
            <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
            />
        </div>
    );
};

export default Editor;