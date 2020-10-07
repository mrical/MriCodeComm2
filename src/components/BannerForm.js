import { Button, IconButton } from "@material-ui/core";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import Banner from "./Banner";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  file: Yup.object()
    .shape({
      name: Yup.string().required("Please Select a file"),
    })
    .label("File")
    .nullable(),
});
export default function BannerForm({ initialValues, onSubmit, bannerUrl }) {
  return (
    <Formik {...{ initialValues, onSubmit, validationSchema }}>
      {({ values, setFieldValue, isSubmitting }) => (
        <Form>
          <input
            accept="image/*"
            type="file"
            name="file"
            id="banner"
            style={{ display: "none" }}
            onChange={(event) => {
              setFieldValue("file", event.target.files[0]);
            }}
          />
          <Banner
            bannerUrl={
              values?.file ? URL.createObjectURL(values.file) : bannerUrl
            }
          />

          <div className="flex justify-end items-center">
            <label htmlFor="banner" className="mr-3">
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
                <EditIcon />
              </Button>
            </label>
            {values.file && (
              <>
                <Button
                  disabled={isSubmitting}
                  color="secondary"
                  className="focus:outline-none mr-3"
                  type="submit"
                  variant="contained"
                  endIcon={<SaveIcon />}
                >
                  Save
                </Button>
                <div className="ml-3">
                  <Button
                    disabled={isSubmitting}
                    color="primary"
                    className="focus:outline-none"
                    variant="outlined"
                    onClick={() => setFieldValue("file", null)}
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
