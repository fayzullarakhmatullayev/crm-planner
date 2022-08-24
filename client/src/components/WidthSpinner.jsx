import React from "react";

const WidthSpinner = ({ children, data = [] }) => {
  return !data.length ? (
    <div className="spinner">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default WidthSpinner;
