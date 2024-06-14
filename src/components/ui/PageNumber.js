import React from "react";

function PageNumber({ next, previous }) {
  return (
    <p className="page">
      {next?.length > 0
        ? next.match(/\d/)[0] - 1
        : next === null
        ? Number(previous.match(/\d/)[0]) + 1
        : ""}
    </p>
  );
}

export default PageNumber;
