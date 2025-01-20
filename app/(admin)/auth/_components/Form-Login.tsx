"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Id harus lebih dari 2 huruf.",
  }),
  password: z.string().min(2, {
    message: "Password harus lebih dari 2 huruf.",
  }),
});

const FormLogin = () => {
  const searhParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const credentialsAction = (formData: any) => {
    setLoading(true);
    signIn("credentials", { ...formData, redirectTo: "/dashboard" });
    setLoading(false);
  };
  const error = searhParams.get("error");
  console.log(error);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(credentialsAction)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan username" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passsword</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan password"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormDescription>Password lebih dari 2 huruf.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col justify-center gap-4">
          <Button variant={"outline"} type="submit">
            {loading && <Loader2 className="animate-spin" />}
            Login
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Kata sandi atau username salah.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </Form>
  );
};

export default FormLogin;
