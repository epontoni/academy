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
import { createCourse } from "@/lib/database/actions/course.actions";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { CourseFormProps, courseDefaultValues } from "@/types";
import { useState } from "react";
import Dropdown from "@/components/dropdown";

import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/file-upload";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "The title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "The description must be at least 10 characters.",
  }),
  imageUrl: z.string().url("La URL de la imagen no es válida"),
  category: z.string(),
  isPublished: z.boolean().default(false),
});

export function CourseForm({
  userId,
  type,
  course,
  courseId,
}: CourseFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();
  const initialValues =
    course && type === "Update"
      ? {
          ...course,
        }
      : courseDefaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    const course = {
      title: values.title,
      description: values.description,
    };

    // CREATE COURSE
    if (type === "Create") {
      try {
        const newCourse = await createCourse({
          title: values.title,
          description: values.description,
          isPublished: values.isPublished,
          imageUrl: uploadedImageUrl,
          instructor: userId,
          category: values.category,
        });

        if (newCourse) {
          form.reset();
          router.push(`/courses/${newCourse._id}`);
        } else {
          toast.error("Something went wrong");
        }
      } catch (e) {
        console.log("[Error]: Error al crear el curso.");
      }
    }

    //   // CREATE EVENT
    //   if (type === "Create") {
    //     try {
    //       const newEvent = await createEvent({
    //         event: { ...values, imageUrl: uploadedImageUrl },
    //         userId,
    //         path: "/dashboard/profile",
    //       });
    //       if (newEvent) {
    //         form.reset();
    //         router.push(`/events/${newEvent._id}`);
    //       }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }

    //   // UPDATE EVENT
    //   if (type === "Update") {
    //     if (!eventId) {
    //       router.back();
    //       return;
    //     }
    //     try {
    //       const updatedEvent = await updateEvent({
    //         event: { ...values, _id: eventId, imageUrl: uploadedImageUrl },
    //         userId,
    //         path: `/events/${eventId}`,
    //       });
    //       if (updatedEvent) {
    //         form.reset();
    //         router.push(`/events/${updatedEvent._id}`);
    //       }
    //     } catch (error) {
    //       handleError(error);
    //     }
    //   }
    // }
  }

  return (
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
                <FormLabel>Course title</FormLabel>
                <FormControl>
                  <Input placeholder="Introduction to algebra" {...field} />
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
            name="category"
            render={({ field }) => (
              <FormItem className="w-full rounded-lg border p-4">
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    categoryId={course?.category._id}
                  />
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
                    En caso de estar activado, este curso será visible.
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
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
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
          />
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
            "Crear curso"
          ) : (
            "Editar cursp"
          )}
        </Button>
      </form>
    </Form>
  );
}
