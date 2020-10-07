import { Button } from "@material-ui/core";
import { signIn } from "next-auth/client";
import React from "react";

export default function LogInBtn() {
  return (
    <>
      <h1 className="mb-3 text-lg font-semibold">LogIn to contineue</h1>
      <Button
        color="primary"
        className="focus:outline-none"
        variant="contained"
        onClick={() => signIn("google").then((res) => console.log(res))}
      >
        LogIn
      </Button>
    </>
  );
}
