import React from "react";

const style = {
  fontSize: "20px",
  minWidth: "42rem",
  backgroundColor: "var(--color-background-500)",
  borderRadius: "7px",
  textAlign: "center",
  paddingTop: "30px",
};

export default function ErrorMessage({ message }) {
  return (
    <p style={style}>
      <span>🔴</span>
      {message}
    </p>
  );
}
