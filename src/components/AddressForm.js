import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React from "react";
import { addressTypes } from "../helpers/addressTypes";

export default function AddressForm({
  initialValues,
  formSchema,
  onFormSubmit,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={onFormSubmit}
    >
      {({ values, isSubmitting, errors, touched }) => (
        <Form className="grid grid-cols-2 gap-5" autoComplete="off">
          <Field
            type="text"
            name="addressType"
            as={Select}
            label="Address Type"
            className="col-span-1"
          >
            {addressTypes.map((t) => (
              <MenuItem key={t.value} value={t.value}>
                {t.name}
              </MenuItem>
            ))}
          </Field>
          <Field
            type="text"
            name="fullName"
            placeholder="Enter Your Full Name"
            as={TextField}
            error={Boolean(touched["fullName"] && errors["fullName"])}
            helperText={touched["fullName"] && errors["fullName"]}
            label="Full Name"
            className="col-span-1"
          />
          <Field
            type="text"
            name="addressLineOne"
            placeholder="Enter Your Address"
            as={TextField}
            error={Boolean(
              touched["addressLineOne"] && errors["addressLineOne"]
            )}
            helperText={touched["addressLineOne"] && errors["addressLineOne"]}
            label="Address Line One"
            className="col-span-2"
          />
          <Field
            type="text"
            name="addressLineTwo"
            placeholder="Enter Your Address"
            as={TextField}
            error={Boolean(
              touched["addressLineTwo"] && errors["addressLineTwo"]
            )}
            helperText={touched["addressLineTwo"] && errors["addressLineTwo"]}
            label="Address Line Two"
            className="col-span-2"
          />
          <Field
            type="text"
            name="phoneNumber"
            placeholder="Enter Your Mobile no."
            as={TextField}
            error={Boolean(touched["phoneNumber"] && errors["phoneNumber"])}
            helperText={touched["phoneNumber"] && errors["phoneNumber"]}
            label="Phone No."
            className="col-span-2"
          />
          <Button
            disabled={isSubmitting}
            className="col-span-2 focus:outline-none my-3"
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
