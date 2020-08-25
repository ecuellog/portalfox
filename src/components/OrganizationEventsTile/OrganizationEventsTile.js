import React from "react";

function OrganizationEventsTile(props) {
  return (
    <div
      className="Component_OrganizationEventsTile card card-body mb-5"
      style={{ minHeight: "400px" }}
    >
      <h5>{props.titleTodoChangeThis}</h5>
      <hr className="mt-0" />
      <p
        style={{
          marginTop: "130px",
          textAlign: "center",
          fontSize: "14px",
          color: "#999"
        }}
      >
        No hay {props.titleTodoChangeThis.toLowerCase()}
      </p>
    </div>
  );
}

export default OrganizationEventsTile;
