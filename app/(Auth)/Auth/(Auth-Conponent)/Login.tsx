
"use client"

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
import { useDispatch, useSelector } from "react-redux"
import { appDispatch, rootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { LoginUser } from "@/redux/features/Login/LoginSlice"
import { toast, ToastContainer } from "react-toastify"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")

})

export function Login() {

  const dispatch = useDispatch<appDispatch>();
  const router = useRouter();
  const { user, loading, error } = useSelector((state: rootState) => state.login)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await dispatch(LoginUser({ email: data.email, password: data.password })).unwrap();
      if (result.user.role === 'ADMIN') {
        router.push("/Dashboard/Users")
      } else {
        router.push("/Dashboard")
      }

    } catch (err) {
      toast.error("You are not registerd user!")
    }
  }

  return (
    <Card className=" sm:max-w-2xl mx-auto w-2/3 mb-10">
      <ToastContainer />
      <div>
        <h3 className="text-3xl font-semibold text-center uppercase">Login </h3>
      </div>

      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel >
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
                  <FieldLabel htmlFor="form-rhf-demo-title">
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
          <Button type="submit" form="form-rhf-demo" className=" w-full rounded-full">
            Login
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
