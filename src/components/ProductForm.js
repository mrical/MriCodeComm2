import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Field, FieldArray, Form, Formik, useField } from "formik";
import React from "react";
import categories from "../helpers/categories";
import FileUpload from "./FileUpload";

const MyCheckbox = (props) => {
  const [field, meta] = useField(props);
  return (
    <FormControlLabel
      control={<Checkbox name="sizes" />}
      {...field}
      label={props.label}
    />
  );
};

export default function ProductForm({
  initialValues,
  handleFormSubmit,
  validationSchema,
}) {
  return (
    <Formik
      {...{ initialValues, onSubmit: handleFormSubmit, validationSchema }}
    >
      {({ values, isSubmitting, setFieldValue, errors, touched }) => (
        <Form
          autoComplete="off"
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          <Field
            name="title"
            type="text"
            placeholder="Enter title"
            as={TextField}
            label="Title"
            error={Boolean(touched["title"] && errors["title"])}
            helperText={touched["title"] && errors["title"]}
            fullWidth
            className="md:col-span-2"
          />
          <Field
            name="description"
            type="text"
            placeholder="Enter description"
            as={TextField}
            label="Description"
            error={Boolean(touched["description"] && errors["description"])}
            helperText={touched["description"] && errors["description"]}
            fullWidth
            className="md:col-span-2"
            multiline
          />
          <FieldArray name="files">
            {(arrayHelpers) => (
              <FileUpload {...{ values, arrayHelpers, setFieldValue }} />
            )}
          </FieldArray>
          <div className="flex items-center justify-between">
            <div>Sizes:</div>
            <Field
              name="sizes"
              label="S"
              type="checkbox"
              value="small"
              error={Boolean(touched["sizes"] && errors["sizes"])}
              helperText={touched["sizes"] && errors["sizes"]}
              as={MyCheckbox}
            />
            <Field
              name="sizes"
              label="M"
              type="checkbox"
              value="medium"
              error={Boolean(touched["sizes"] && errors["sizes"])}
              helperText={touched["sizes"] && errors["sizes"]}
              as={MyCheckbox}
            />
            <Field
              name="sizes"
              label="L"
              type="checkbox"
              value="large"
              error={Boolean(touched["sizes"] && errors["sizes"])}
              helperText={touched["sizes"] && errors["sizes"]}
              as={MyCheckbox}
            />
            <Field
              name="sizes"
              type="checkbox"
              value="extralarge"
              label="XL"
              error={Boolean(touched["sizes"] && errors["sizes"])}
              helperText={touched["sizes"] && errors["sizes"]}
              as={MyCheckbox}
            />
          </div>
          <Field
            name="price"
            type="text"
            placeholder="Enter price(in Rs)"
            as={TextField}
            label="Price"
            error={Boolean(touched["price"] && errors["price"])}
            helperText={touched["price"] && errors["price"]}
          />
          <Field
            name="discountedPrice"
            type="text"
            placeholder="Enter discounted price"
            as={TextField}
            label="Discount Price"
            error={Boolean(
              touched["discountedPrice"] && errors["discountedPrice"]
            )}
            helperText={touched["discountedPrice"] && errors["discountedPrice"]}
          />
          <Field
            name="category"
            autoComplete="off"
            as={Select}
            label="Category"
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Field>
          <div>
            <label htmlFor="featured">Featured : </label>
            <Field
              name="featured"
              type="checkbox"
              autoComplete="off"
              as={Checkbox}
            />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="md:col-span-2"
            color="primary"
            variant="contained"
            className="focus:outline-none"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}
