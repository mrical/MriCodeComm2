import { Button, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";

export default function ResponseForm({
  initialValues,
  onResponseSubmit,
  validationSchema,
  setSubmitType,
}) {
  return (
    <Formik
      {...{ initialValues, onSubmit: onResponseSubmit, validationSchema }}
    >
      {({ isSubmitting, submitForm, errors, touched }) => (
        <Form>
          <Field
            autoComplete="off"
            name="message"
            label="Enter Your Message..."
            error={Boolean(touched["message"] && errors["message"])}
            helperText={touched["message"] && errors["message"]}
            fullWidth
            as={TextField}
          />

          <div className="flex justify-between mt-2">
            <Button
              disabled={isSubmitting}
              onClick={() => {
                setSubmitType("approve");
                submitForm();
              }}
              variant="contained"
              color="primary"
              className="focus:outline-none"
            >
              Approve
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={() => {
                setSubmitType("reject");
                submitForm();
              }}
              variant="contained"
              color="secondary"
              className="focus:outline-none"
            >
              Reject
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
