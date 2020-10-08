import { Button } from "@material-ui/core";
import { signIn } from "next-auth/client";
import React from "react";

export default function LogInBtn() {
  return (
    <div className="rounded-lg shadow-lg p-2 md:p-4 mb-4 text-center">
      <h1 className="mb-3 text-lg font-semibold">LogIn to continue</h1>
      <Button
        color="primary"
        className="focus:outline-none"
        variant="contained"
        onClick={() => signIn("google").then((res) => console.log(res))}
      >
        LogIn
      </Button>
    </div>
  );
}
