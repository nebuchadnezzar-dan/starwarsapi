import React from "react";
function TextDescription({ label, orientation }) {
  if (orientation === "badge")
    return (
      <p>
        {label.map((lab) => (
          <React.Fragment key={lab.label}>
            {lab.label}: <span>{lab.labelValue}</span>
            <br />
          </React.Fragment>
        ))}
      </p>
    );
  return (
    <div className="info">
      {label.map((lab) => (
        <p key={lab.label}>
          {lab.label}: <span>{lab.labelValue}</span>
        </p>
      ))}
    </div>
  );
}

export default TextDescription;
