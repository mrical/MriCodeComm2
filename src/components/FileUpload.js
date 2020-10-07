import { Button } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";

export default function FileUpload({ values, arrayHelpers, setFieldValue }) {
  return (
    <div className="flex flex-col md:col-span-2">
      {values.files.map((file, i) => (
        <div key={i} className="grid grid-cols-5 gap-1 py-3 items-center">
          <input
            name={`files.${i}`}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id={`raised-button-file-${i}`}
            onChange={(event) => {
              setFieldValue(`files.${i}`, event.target.files[0]);
            }}
          />
          <label htmlFor={`raised-button-file-${i}`} className="col-span-2">
            <Button
              className="focus:outline-none"
              variant="contained"
              color="primary"
              component="span"
              size="small"
              style={{
                textTransform: "capitalize",
              }}
            >
              Select Image
            </Button>
          </label>
          <img
            className="col-span-2"
            src={values.files[i] ? URL.createObjectURL(values.files[i]) : ""}
          />
          <Button
            color="secondary"
            className="focus:outline-none col-span-1"
            onClick={() => arrayHelpers.remove(i)}
            size="small"
          >
            <CancelIcon />
          </Button>
        </div>
      ))}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => arrayHelpers.push(null)}
        className="focus:outline-none"
        // style={{ color: "#4299e1", borderColor: "#4299e1" }}
      >
        <AddAPhotoIcon fontSize="large" /> <span className="p-2">Add More</span>
      </Button>
    </div>
  );
}
