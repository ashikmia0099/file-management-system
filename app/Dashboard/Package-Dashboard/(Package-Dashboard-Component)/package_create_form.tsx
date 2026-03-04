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
import { useDispatch, useSelector } from "react-redux"
import { appDispatch, rootState } from "@/redux/store"
import { useRouter } from "next/navigation"
import { SubscriptionPackage } from "@/redux/features/Subscription_Package/subscriptionPackageSlice"
import { toast, ToastContainer } from "react-toastify"

const formSchema = z.object({
  PackageName: z.string().min(5).max(20),
  MaxFolders: z.coerce.number().min(1),
  MaxNestingFolder: z.coerce.number(),
  AllowedFileTypes: z.array(z.string()).min(1),
  MaxFileSizeMB: z.coerce.number().min(1),
  TotalFileLimit: z.coerce.number(),
  FilePerFolder: z.coerce.number().min(1),
});

export function PackageForm() {



  const dispatch = useDispatch<appDispatch>();
  const { subscriptionpackage, loading, error } = useSelector((state: rootState) => state.subscriptionPackage)
  type FormData = z.infer<typeof formSchema>;

  const fileTypes = ["image", "pdf", "video", "audio"];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      PackageName: "",
      MaxFolders: 1,
      MaxNestingFolder: 0,
      AllowedFileTypes: [],
      MaxFileSizeMB: 1,
      TotalFileLimit: 0,
      FilePerFolder: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {

    try {
      await dispatch(SubscriptionPackage(data)).unwrap()
      toast.success("Subscription package create successfully.")
    }
    catch (err: any) {
      toast.error(err || "Something want wrong")
    }
  }

  return (
    <Card className="w-full sm:max-w-2xl mx-auto">
      <ToastContainer />

      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="PackageName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Package Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Package Name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className=" flex gap-x-2">
              <Controller
                name="MaxFolders"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Maximum Folder Create
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Maximum Folder Create"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="MaxNestingFolder"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Maximum Nesting Level
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Maximum Sub Folder Crete Every Folder "
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className=" grid grid-cols-2 gap-x-2 ">
              <Controller
                name="AllowedFileTypes"
                control={form.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Select allowed file types
                    </FieldLabel>
                    {fileTypes.map((type) => (
                      <label key={type} className="flex gap-2">
                        <input
                          type="checkbox"
                          value={type}
                          checked={field.value?.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, type]);
                            } else {
                              field.onChange(
                                field.value.filter((val: string) => val !== type)
                              );
                            }
                          }}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                )}
              />
              <Controller
                name="MaxFileSizeMB"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Maximum File Size MB
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Maximum File Size MB"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className=" flex gap-x-2">
              <Controller
                name="TotalFileLimit"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Total File Limit
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Total file limit in package"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="FilePerFolder"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Total File Limit Per Folder
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder="Total file limit per folder"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" className=" w-full rounded-full" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
