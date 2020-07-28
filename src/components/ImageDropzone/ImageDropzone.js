import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import './ImageDropzone.scss';

function ImageDropzone(props) {
  const onDrop = useCallback(acceptedFiles => {
    props.onDrop(acceptedFiles[0]); 
  });

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps({className: props.className + ' Component_ImageDropzone'})}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default ImageDropzone;
