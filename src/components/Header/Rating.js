import React, { Component, useEffect, useState } from "react";
import Star from "./Star";

export default function Rating({
  stars = 5,
  off,
  max = 5,
  value,
  setValue,
  dynamicValue,
  setDynamicValue,
}) {
  const colors = {
    1: "#f44336",
    2: "#FF5722",
    3: "#FF9800",
    4: "#FFC107",
    5: "#FFEB3B",
  };
  const meanings = {
    0: "No Rating 🚫",
    1: "Terrible 🤮",
    2: "Mediocre 😒",
    3: "Average 😐",
    4: "Solid 🙂",
    5: "Fantastic 🔥",
  };
  useEffect(() => {}, [value]);
  const handleClick = (newValue) => {
    setValue(newValue);
    setDynamicValue(newValue);
  };
  const handleMouseEnter = (newValue) => {
    setDynamicValue(newValue);
  };

  const handleMouseLeave = (newValue) => {
    setDynamicValue(value);
  };
  const starSpans = [];
  let count = dynamicValue;
  for (let v = 1; v <= max; v++) {
    off
      ? starSpans.push(
          <Star key={v} color={colors[stars]} isFilled={v <= stars} value={v} />
        )
      : starSpans.push(
          <Star
            key={v}
            color={colors[count]}
            isFilled={v <= dynamicValue}
            value={v}
            handleHover={handleMouseEnter}
            handleHoverLeave={handleMouseLeave}
            handleClick={handleClick}
          />
        );
  }
  return (
    <div className="flex flex-col justify-center items-center">
      {!off && <p>{meanings[value]}</p>}
      <div>{starSpans}</div>
    </div>
  );
}
