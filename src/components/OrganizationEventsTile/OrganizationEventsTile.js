import React from 'react';

function OrganizationEventsTile(props) {
  return (
    <div className="Component_OrganizationEventsTile card card-body mb-3" style={{'min-height': '400px'}}>
      <h3>{props.titleTodoChangeThis}</h3>
      <hr/>
      <p style={{'margin-top':'130px', 'textAlign': 'center'}}>No recent {props.titleTodoChangeThis}</p>
    </div>
  );
}

export default OrganizationEventsTile;
