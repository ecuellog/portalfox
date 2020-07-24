import React, {useState, useRef} from 'react';
import JoditEditor from "jodit-react";

const OrganizationArticleNewView = ({}) => {
	const editor = useRef(null)
	const [content, setContent] = useState('')
	
	const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true
    },
    buttons: "paragraph,|,bold,strikethrough,underline,italic,eraser,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,font,fontsize,brush,|,image,file,video,table,link,|,align,undo,redo,\n,selectall,cut,copy,paste,copyformat,|,hr,symbol,fullsize,print"
	}
	
	return (
    <JoditEditor
      ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={newContent => {}}
    />
  );
}

export default OrganizationArticleNewView;