import React from "react";
import moment from "moment";

export default function DateBox({ date, dateType }) {
  return (
    <div className="my-2 pb-2" style={{ borderBottomWidth: "1px" }}>
      <div className="flex justify-around p-2 rounded-lg bg-gray-200">
        <span className="capitalize">{dateType} At</span>
        <span>{moment(date).format("hh:mm A D-MMM")}</span>
      </div>
    </div>
  );
}
