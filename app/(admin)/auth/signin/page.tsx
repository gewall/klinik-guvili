import React from "react";
import FormLogin from "../_components/Form-Login";
import Typograph from "@/components/ui/typograph";
import { Separator } from "@/components/ui/separator";

const SignIn = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <div className="p-4 border-2 border-zinc-200 w-96">
        <Typograph variant="Header" className="text-center">
          LOGIN
        </Typograph>
        <Separator className="my-4" />
        <FormLogin />
      </div>
    </div>
  );
};

export default SignIn;
