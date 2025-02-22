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
          <h2>Soltar Imagen</h2> :
          <div>
            <h2>Soltar Imagen</h2>
            <p>Arrastra una imagen o haz click aqui para subirla</p>
          </div>
      }
    </div>
  )
}

export default ImageDropzone;
