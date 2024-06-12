import React from "react";

function StatusMessage({ className, children }) {
  return (
    <div className={className}>
      <p className="message-text">{children}</p>
    </div>
  );
}

export default StatusMessage;
