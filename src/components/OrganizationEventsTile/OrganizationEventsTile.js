import React from 'react';

function OrganizationEventsTile(props) {
  return (
    <div className="Component_OrganizationEventsTile card card-body mb-3" style={{'minHeight': '400px'}}>
      <h3>{props.titleTodoChangeThis}</h3>
      <hr/>
      <p style={{'marginTop':'130px', 'textAlign': 'center'}}>No recent {props.titleTodoChangeThis}</p>
    </div>
  );
}

export default OrganizationEventsTile;
