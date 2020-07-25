import React, { useState } from 'react';
import JoditEditor from "jodit-react";
import { pure } from 'recompose';

function WrapperJoditEditor (props) {
  const [content, setContent] = useState('');
  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true
    },
    buttons: "paragraph,|,bold,strikethrough,underline,italic,eraser,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,font,fontsize,brush,|,image,file,video,table,link,|,align,undo,redo,\n,selectall,cut,copy,paste,copyformat,|,hr,symbol,fullsize,print"
  }

	return (
    <JoditEditor
      value={content}
      config={config}
      onBlur={newContent => setContent(newContent)}
      onChange={newContent => console.log(newContent)}
    />
  );
}

export default pure(WrapperJoditEditor);