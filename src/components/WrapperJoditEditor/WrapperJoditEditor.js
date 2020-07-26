import React, { memo } from 'react';
import JoditEditor from "jodit-react";

function WrapperJoditEditor(props) {
  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true
    },
    buttons: "paragraph,|,bold,strikethrough,underline,italic,eraser,|,superscript,subscript,|,ul,ol,|,outdent,indent,|,font,fontsize,brush,|,image,file,video,table,link,|,align,undo,redo,\n,selectall,cut,copy,paste,copyformat,|,hr,symbol,fullsize,print"
  }

	return (
    <JoditEditor
      value={props.value}
      config={config}
      onBlur={props.onBlur}
    />
  );
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.value === nextProps.value; 
}

export default memo(WrapperJoditEditor, arePropsEqual);