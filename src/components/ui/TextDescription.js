import React from "react";
function TextDescription({ label, labelClassName, orientation }) {
  if (orientation === "badge")
    return (
      <p>
        {label.map((lab) => (
          <React.Fragment key={lab.label}>
            {lab.label}: <span>{lab.labelValue || "N/A"}</span>
            <br />
          </React.Fragment>
        ))}
      </p>
    );
  return (
    <div className={labelClassName}>
      {label.map((lab) => (
        <p key={lab.label}>
          {lab.label}:<span>{lab.labelValue || "N/A"}</span>
        </p>
      ))}
    </div>
  );
}

export default TextDescription;
