"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { toast } from "sonner";
import {
  CourseFormProps,
  UpdateCourseParams,
  courseDefaultValues,
} from "@/types";
import { useState } from "react";
import Dropdown from "@/components/dropdown";

import { useUploadThing } from "@/lib/uploadthing";
import { usePathname, useRouter } from "next/navigation";
import FileUpload from "@/components/file-upload";
import { Switch } from "@/components/ui/switch";
import { Loader2, Trash } from "lucide-react";
import { handleError } from "@/lib/utils";

import RichEditor from "./RichEditor";
import Link from "next/link";
import { createUnit } from "@/lib/database/actions/unit.actions";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "The title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "The description must be at least 10 characters.",
  }),
  isPublished: z.boolean().default(false),
});

type UnitFormProps = {
  userId?: string;
  type: "Create" | "Update";
  course?: {};
  courseId: string;
};

export function UnitForm({ userId, type, course, courseId }: UnitFormProps) {
  // const [files, setFiles] = useState<File[]>([]);
  // const { startUpload } = useUploadThing("imageUploader");

  console.log("Creando...", type, courseId);

  const router = useRouter();
  const pathname = usePathname();
  const initialValues = {
    title: "",
    description: "",
    isPublished: false,
  };
  // course && type === "Update"
  //   ? {
  //       ...course,
  //     }
  //   : courseDefaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // let uploadedImageUrl = values.imageUrl;

    // if (files.length > 0) {
    //   const uploadedImages = await startUpload(files);

    //   if (!uploadedImages) {
    //     return;
    //   }

    //   uploadedImageUrl = uploadedImages[0].url;
    // }

    console.log("Creando...", type, values, courseId);

    // CREATE COURSE
    if (type === "Create") {
      try {
        console.log("Creando...", type, values, courseId);
        const newUnit = await createUnit({
          title: values.title,
          description: values.description,
          isPublished: values.isPublished,
          courseId: courseId!,
        });

        if (newUnit) {
          form.reset();
          //router.push(`/dashboard/edit/${newUnit.courseId}/curriculum`);
          toast.success("Unidad creada correctamente!");
        } else {
          toast.error("Something went wrong");
        }
      } catch (e) {
        console.log("[Error]: Error al crear el curso.");
        handleError(e);
      }
    }

    // UPDATE EVENT
    // if (type === "Update") {
    //   if (!courseId) {
    //     router.back();
    //     return;
    //   }
    //   try {
    //     const updatedCourse = await updateUnit({
    //       course: {
    //         ...values,
    //         //category: values.category as Partial<ICategory>,
    //         _id: courseId,
    //         imageUrl: uploadedImageUrl,
    //       },
    //       userId,
    //       path: `/courses/${courseId}`,
    //     });
    //     if (updatedCourse) {
    //       form.reset();
    //       router.push(`/courses/${updatedCourse._id}`);
    //     }
    //   } catch (error) {
    //     console.log("[Error]: Error al actualizar el curso.");
    //     handleError(error);
    //   }
    // }
  }

  const routes = [
    { label: "Basic Information", path: `/dashboard/edit/${courseId}` },
    { label: "Curriculum", path: `/dashboard/edit/${courseId}/curriculum` },
  ];

  return (
    <>
      {type === "Update" && (
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between mb-7">
          <div className="flex gap-5">
            {routes.map((route) => (
              <Button
                asChild
                key={route.path}
                variant={pathname === route.path ? "default" : "outline"}
              >
                <Link href={route.path}>{route.label}</Link>
              </Button>
            ))}
          </div>

          <div className="flex gap-4 items-start">
            <Button variant="outline">Publish</Button>
            <Button>
              <Trash />
            </Button>
          </div>
        </div>
      )}
      <h1 className="font-bold text-xl mb-2">Add new unit</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 space-y-8"
        >
          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full rounded-lg border p-4">
                  <FormLabel>Unit name</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduction" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="w-full flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Publicación</FormLabel>
                    <FormDescription>
                      En caso de estar activado, esta unidad será visible.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 md:flex-row">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full rounded-lg border p-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    {/* <Textarea placeholder="Description" {...field} /> */}
                    <RichEditor placeholder="Description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full rounded-lg border p-4">
                  <FormLabel>Imagen del curso</FormLabel>
                  <FormControl>
                    <FileUpload
                      onFileChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="col-span-2 w-full"
          >
            {form.formState.isSubmitting ? (
              type === "Create" ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />{" "}
                  <span>Creando...</span>
                </>
              ) : (
                <>
                  <Loader2 className="mr-2 animate-spin" />{" "}
                  <span>Editando...</span>
                </>
              )
            ) : type === "Create" ? (
              "Crear unidad"
            ) : (
              "Editar unidad"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
