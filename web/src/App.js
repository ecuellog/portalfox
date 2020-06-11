import React from 'react';
import Cookies from 'js-cookie';

function App() {
var spaceName = Cookies.get('space_name');

  return (
    <div>
      <h1>
        Hello World
      </h1>
      <h2>
        Your are inside the {spaceName} Space!
      </h2>
    </div>
  );
}

export default App;