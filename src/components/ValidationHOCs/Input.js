import React, { useEffect } from 'react';
import { control } from 'react-validation';

function Input({ error, isChanged, isUsed, onErrorChange, ...props }) {

  useEffect(() => {
    if (isChanged && isUsed && error) {
      onErrorChange(error);
    } else {
      onErrorChange('');
    }
  }, [isChanged, isUsed, error]);

  return (
    <input {...props} />
  );
}
 
export default control(Input);