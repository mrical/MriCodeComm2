import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Rating from "./Header/Rating";

export default function ReviewForm({
  initialValues,
  onFormSubmit,
  validationSchema,
}) {
  const [dynamicValue, setDynamicValue] = useState(initialValues.rating);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (...props) => {
        await onFormSubmit(...props);
        setDynamicValue(initialValues.rating);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, values, setFieldValue, touched, errors }) => (
        <Form className="flex flex-col justify-center items-center m-4">
          <div className="">
            <Field name="rating">
              {({ field }) => (
                <>
                  <Rating
                    value={field.value}
                    setValue={(v) => setFieldValue("rating", v)}
                    dynamicValue={dynamicValue}
                    setDynamicValue={setDynamicValue}
                  />
                </>
              )}
            </Field>
          </div>
          <div className="flex items-end justify-evenly w-full">
            <Field
              type="text"
              name="text"
              label="Review"
              placeholder="Enter your review"
              as={TextField}
              error={Boolean(touched["text"] && errors["text"])}
              helperText={touched["text"] && errors["text"]}
            />
            <Button
              disabled={isSubmitting}
              type="submit"
              variant="contained"
              color="primary"
              className="focus:outline-none"
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
