import { Button, Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("./dashboard"));
import isAdmin from "../../helpers/ensureAdmin";
import { useRouter } from "next/router";
import Head from "next/head";
function LoginPage({ isAdmin }) {
  const router = useRouter();
  useEffect(() => {
    if (isAdmin) {
      router.replace("/admin/login", "/admin/dashboard", { shallow: true });
    }
    return;
  }, [isAdmin]);
  if (isAdmin) {
    return <Dashboard />;
  }
  const [loginError, setLoginError] = useState(false);
  return (
    <div className="bg-gray-300 p-3 rounded-md border-black border shadow-lg md:w-3/5 mx-auto overflow-x-hidden">
      <Head>
        <title>Admin | MriCodecomm</title>
      </Head>
      <div className="text-2xl text-center font-semibold">Admin Login</div>
      <Formik
        initialValues={{ userName: "", password: "" }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const res = await Axios.post("/api/adminAuth", {
            loginDetails: values,
          });
          if (res.error) {
            setLoginError(res.error);
          } else {
            router.push("/admin/dashboard");
          }
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="grid gap-4">
            <Field
              name="userName"
              type="text"
              label="User Name"
              as={TextField}
            />
            <Field
              name="password"
              type="password"
              label="Password"
              as={TextField}
            />
            <Button
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Continiue
            </Button>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={Boolean(loginError)}
        autoHideDuration={6000}
        onClose={() => setLoginError(false)}
      >
        <Alert onClose={() => setLoginError(false)} severity={loginError}>
          {loginError}
        </Alert>
      </Snackbar>
    </div>
  );
}
export async function getServerSideProps(ctx) {
  const admin = await isAdmin(ctx);
  if (admin) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/admin/dashboard" });
    res.end();
  }
  return { props: {} };
}
export default LoginPage;
