
"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/features/Register/registerSlice";
import type { appDispatch, rootState } from "@/redux/store";
import { ToastContainer, toast } from 'react-toastify';

const formSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters."),
  email: z.string().email("Enter your vaild email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export function Register() {

  const dispatch = useDispatch<appDispatch>();
  const { loading, error } = useSelector((state: rootState) => state.register);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {

    try {
      await dispatch(registerUser(data)).unwrap()
      toast.success("Registation Successfully")
    }
    catch (err: any) {
      toast.error(err || "Something want wrong")
    }
  }

  return (
    <Card className=" sm:max-w-2xl mx-auto w-2/3 mb-10">
      <ToastContainer />
      <div>
        <h3 className="text-3xl font-semibold text-center uppercase">Register </h3>
      </div>

      <CardContent className=" ">
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    User Name
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Enter Your Name" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}

                    placeholder="Enter Your Email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel >
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter Your Password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-rhf-demo" className=" w-full rounded-full cursor-pointer" disabled={loading}>
            Register
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
