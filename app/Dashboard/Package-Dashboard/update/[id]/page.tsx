'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter, useParams } from "next/navigation"
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
import { toast, ToastContainer } from "react-toastify"
import { useEffect, useState } from "react"

const formSchema = z.object({
  PackageName: z.string().min(5).max(30),
  MaxFolders: z.coerce.number().min(1),
  MaxNestingFolder: z.coerce.number(),
  AllowedFileTypes: z.array(z.string()).min(1),
  MaxFileSizeMB: z.coerce.number().min(1),
  TotalFileLimit: z.coerce.number(),
  FilePerFolder: z.coerce.number().min(1),
});

const fileTypes = ["image", "pdf", "video", "audio"];

export default function UpdatePackagePage() {
  const router = useRouter();
  const params = useParams(); // dynamic route params
  const packageId = params.id;

  const [loadingData, setLoadingData] = useState(true);

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

  // Fetch package data by ID and pre-fill form
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const auth = localStorage.getItem("auth");
        const token = auth ? JSON.parse(auth).token : null;
        if (!token) return toast.error("You are not authorized");

        const res = await fetch(`https://file-management-system-backend.vercel.app/subscription/package/${packageId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!data.success) {
          toast.error(data.message || "Failed to fetch package");
          return;
        }

        form.reset({
          PackageName: data.data.PackageName,
          MaxFolders: data.data.MaxFolders,
          MaxNestingFolder: data.data.MaxNestingFolder,
          AllowedFileTypes: data.data.AllowedFileTypes,
          MaxFileSizeMB: data.data.MaxFileSizeMB,
          TotalFileLimit: data.data.TotalFileLimit,
          FilePerFolder: data.data.FilePerFolder,
        });

      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching data");
      } finally {
        setLoadingData(false);
      }
    };

    if (packageId) fetchPackage();
  }, [packageId]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const auth = localStorage.getItem("auth");
      const token = auth ? JSON.parse(auth).token : null;
      if (!token) return toast.error("You are not authorized");

      const res = await fetch(`https://file-management-system-backend.vercel.app/subscription/package/update/${packageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result.success) {
        toast.error(result.message || "Failed to update package");
        return;
      }

      toast.success("Package updated successfully");
      router.push("/Dashboard/Package-Dashboard"); 

    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };


  return (
    <Card className="w-full sm:max-w-2xl mx-auto">
      <ToastContainer />
      <CardContent>
        <form id="update-package-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="PackageName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Package Name</FieldLabel>
                  <Input {...field} placeholder="Package Name" autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <div className="flex gap-x-2">
              <Controller
                name="MaxFolders"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Maximum Folder Create</FieldLabel>
                    <Input {...field} placeholder="Maximum Folder Create" autoComplete="off" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="MaxNestingFolder"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Maximum Nesting Level</FieldLabel>
                    <Input {...field} placeholder="Maximum Sub Folder Create" autoComplete="off" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
              <Controller
                name="AllowedFileTypes"
                control={form.control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <FieldLabel>Select allowed file types</FieldLabel>
                    {fileTypes.map((type) => (
                      <label key={type} className="flex gap-2">
                        <input
                          type="checkbox"
                          value={type}
                          checked={field.value.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              field.onChange([...field.value, type]);
                            } else {
                              field.onChange(field.value.filter((val: string) => val !== type));
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
                    <FieldLabel>Maximum File Size MB</FieldLabel>
                    <Input {...field} placeholder="Max File Size MB" autoComplete="off" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>

            <div className="flex gap-x-2">
              <Controller
                name="TotalFileLimit"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Total File Limit</FieldLabel>
                    <Input {...field} placeholder="Total file limit in package" autoComplete="off" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="FilePerFolder"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Total File Limit Per Folder</FieldLabel>
                    <Input {...field} placeholder="File limit per folder" autoComplete="off" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="update-package-form" className="w-full rounded-full cursor-pointer">
          Update Package
        </Button>
      </CardFooter>
    </Card>
  )
}