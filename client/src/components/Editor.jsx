import React, {useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = () => {
    const [content, setContent] = useState("");

    return (
        <div className="container">
            <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
            className="border-2 w-full focus:ring-[#139086] focus:border-[#139086] border-[#0F766E]"
            />
        </div>
    );
};

export default Editor;