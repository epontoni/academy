"use client";
// Lesson
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     position: { type: Number },
//     isCompleted: { type: Boolean, default: false },
//     unitId: { type: Schema.Types.ObjectId, ref: "Unit" },
//     attachments:

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { Switch } from "@/components/ui/switch";
import {
  CirclePlus,
  Clipboard,
  Link2,
  Loader2,
  Paperclip,
  Trash,
} from "lucide-react";
import { handleError } from "@/lib/utils";

import RichEditor from "./RichEditor";
import Link from "next/link";

import DeleteConfirmation from "@/components/delete-confirmation";
import { ILesson } from "@/lib/database/models/lesson.model";
import {
  createLesson,
  updateLesson,
} from "@/lib/database/actions/lesson.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { createResource } from "@/lib/database/actions/attachment.action";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "The title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "The description must be at least 10 characters.",
  }),
  isPublished: z.boolean().default(false),
  attachments: z.array(
    z.object({
      resourceName: z.string().min(3, {
        message: "The resource name must be at least 3 characters.",
      }),
      resourceUrl: z.string().min(3, {
        message: "The resource URL must be at least 3 characters.",
      }),
    })
  ),
});

const lessonDefaultValues = {
  title: "",
  description: "",
  isPublished: false,
  attachments: [],
};

type LessonFormProps = {
  type: "Create" | "Update";
  courseId: string;
  unitId: string;
  lesson?: ILesson;
  lessonId?: string;
};

export function LessonForm({
  type,
  courseId,
  unitId,
  lesson,
  lessonId,
}: LessonFormProps) {
  const router = useRouter();
  const pathname = usePathname();

  const initialValues =
    lesson && type === "Update"
      ? {
          ...lesson,
        }
      : lessonDefaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "attachments",
  });

  const handleRemove = (index: number) => {
    remove(index);
  };

  const handleAppend = () => {
    append({ resourceName: "", resourceUrl: "" });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // CREATE COURSE
    if (type === "Create") {
      try {
        const newLesson = await createLesson({
          title: values.title,
          description: values.description,
          isPublished: values.isPublished,
          unitId: unitId!,
        });

        if (newLesson) {
          // Save the attachments
          const newAttachments = await createResource({
            attachments: values.attachments,
            lessonId: newLesson._id,
          });

          form.reset();
          //router.push(`/dashboard/edit/${newUnit.courseId}/curriculum`);
          toast.success("Lección creada correctamente!");
          //   setTimeout(() => {
          //     router.push(`/dashboard/edit/${courseId}/curriculum`);
          //   }, 3000);
        } else {
          toast.error("Something went wrong");
        }
      } catch (e) {
        console.log("[Error]: Error al crear el curso.");
        handleError(e);
      }
    }

    // UPDATE UNIT
    if (type === "Update") {
      // if (!unitId) {
      //   router.back();
      //   return;
      // }
      try {
        const updatedLesson = await updateLesson({
          lesson: {
            _id: lessonId!,
            title: values.title,
            description: values.description,
            isPublished: values.isPublished,
            // attachments: values.attachments,
          },
          path: `/dashboard/edit/${courseId}/curriculum/${unitId}/lessons`,
        });
        if (updatedLesson) {
          form.reset();
          router.push(
            `/dashboard/edit/${courseId}/curriculum/${unitId}/lessons`
          ); // /${updatedUnit._id}
        }
      } catch (error) {
        console.log("[Error]: Error al actualizar la lección.");
        handleError(error);
      }
    }
  }

  //   const routes = [
  //     { label: "Basic Information", path: `/dashboard/edit/${courseId}` },
  //     { label: "Curriculum", path: `/dashboard/edit/${courseId}/curriculum` },
  //   ];

  return (
    <>
      {/*type === "Update" && (
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
              <DeleteConfirmation courseId={courseId!} />
            </Button>
            <DeleteConfirmation courseId={courseId!} /> COMMENT THIS LINE AFTER REMOVE THE OUTER COMENT 
          </div>
        </div>
      )*/}

      <h1 className="font-bold my-2">
        {type === "Create" ? "Create Lesson" : "Update Lesson"}
      </h1>
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
                  <FormLabel>Lesson title</FormLabel>
                  <FormControl>
                    <Input placeholder="Introduction to algebra" {...field} />
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
                    {/* <Textarea placeholder="Description" {...field} /> */}
                    <RichEditor placeholder="Description..." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Paperclip />
                Add resource (optional)
              </CardTitle>
              <CardDescription>
                Add resource to this lesson to help students learn better.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {fields.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    className="flex items-center justify-center gap-2 mb-2"
                  >
                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`attachments.${index}.resourceName`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <div className="flex justify-center items-center gap-2">
                              <Paperclip />
                              <Input placeholder="Resource name" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      key={field.id}
                      control={form.control}
                      name={`attachments.${index}.resourceUrl`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <div className="flex justify-center items-center gap-2">
                              <Link2 />
                              <Input placeholder="Resource URL" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      onClick={() => handleRemove(index)}
                      variant="destructive"
                    >
                      <Trash />
                    </Button>
                  </div>
                );
              })}

              <div className="w-full mt-4 flex justify-between">
                <Button
                  onClick={handleAppend}
                  variant="link"
                  className="flex gap-2"
                >
                  <CirclePlus />
                  Add new resource
                </Button>
              </div>
            </CardContent>
            {/* <CardFooter>Footer</CardFooter> */}
          </Card>

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
              "Crear lección"
            ) : (
              "Editar lección"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
