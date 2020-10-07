import { Button, Radio, TextField } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import { allSizes } from "../helpers/sizes";
import Address from "./Address";
export default function RequestForm({
  onFormSubmit,
  initialValues,
  addresses,
  validationSchema,
  sizes,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={validationSchema}
    >
      {({ values, isSubmitting, touched, errors, setFieldValue }) => (
        <Form autoComplete="off">
          {addresses ? (
            <>
              <h1 className="text-lg text-center mb-3 font-semibold">
                Select Address
              </h1>

              <div className="grid md:grid-cols-2 gap-2 mb-2">
                {addresses.map((addressDetails, i) => (
                  <div
                    key={`address-${i}`}
                    className="flex flex-row md:flex-row items-center justify-center"
                  >
                    <Field
                      type="radio"
                      value={addressDetails._id}
                      name="addressId"
                      as={Radio}
                    />
                    <Address {...addressDetails} viewOnly />
                  </div>
                ))}
                <ErrorMessage name="addressId" />
              </div>
            </>
          ) : (
            <div>
              <h1>No address available</h1>
              <Link href="/address/create">
                <a>Create Address</a>
              </Link>
            </div>
          )}
          <div className="mt-4">
            <h1 className="text-lg text-center mb-3 font-semibold">
              Select Size
            </h1>
            <div className="flex justify-center">
              {allSizes.map((s, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-full w-8 md:w-10 h-8 md:h-10 mx-1  ${
                    values.size === s.name
                      ? "border-blue-400 border-2"
                      : "border border-black"
                  } flex justify-center shadow-md items-center ${
                    sizes.includes(s.name)
                      ? "cursor-pointer"
                      : "line-through bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (sizes.includes(s.name)) {
                      setFieldValue("size", s.name);
                    }
                  }}
                >
                  <span className=" text-base md:text-lg">{s.initials}</span>
                </div>
              ))}
            </div>
            <ErrorMessage name="size" />
          </div>
          <div className="mb-3">
            <Field
              as={TextField}
              name="message"
              label="Additional Message"
              placeholder="Write a message"
              fullWidth
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            type="submit"
            fullWidth
            className="focus:outline-none"
          >
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
}
