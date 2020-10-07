import React from "react";
function Star({
  value,
  color,
  handleHover,
  handleHoverLeave,
  handleClick,
  isFilled,
}) {
  if (!handleClick) {
    return (
      <span className="text-2xl" style={{ color }}>
        {isFilled ? "★" : "☆"}
      </span>
    );
  }
  return (
    <span
      className="Star cursor-pointer text-4xl leading-6"
      style={{ color }}
      onMouseEnter={() => handleHover(value)}
      onMouseLeave={() => handleHoverLeave(value)}
      onClick={() => handleClick(value)}
    >
      {isFilled ? "★" : "☆"}
    </span>
  );
}
export default Star;
