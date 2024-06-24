"use client";

import { z } from "zod";
import {
  CircleDollarSign,
  CirclePlus,
  Link,
  Loader2,
  Paperclip,
  Ruler,
  Trash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createResource } from "@/lib/database/actions/attachment.action";
import { toast } from "sonner";

const formSchema = z.object({
  attachments: z.array(
    z.object({
      resourceName: z.string(),
      resourceUrl: z.string(),
    })
  ),
});

const useDynamicForm = (lessonId: string) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attachments: [{ resourceName: "", resourceUrl: "" }],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Submiting form", data.attachments);
    alert(`Submiting form ${JSON.stringify(data.attachments)}`);

    const result = await createResource({
      attachments: data.attachments,
      lessonId,
    });

    if (result) {
      toast.success("Recursos creados correctamente");
    } else {
      toast.error("Something went wrong!");
    }
  };

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

  return {
    form,
    fields,
    //append,
    //remove,
    onSubmit,
    handleRemove,
    handleAppend,
  };
};

export default function ResourceForm({ lessonId }: { lessonId: string }) {
  const { form, fields, onSubmit, handleRemove, handleAppend } =
    useDynamicForm(lessonId);

  //Observar los valores de los checkboxes y actualizar los precios
  const distances = form.watch("attachments");
  //   useEffect(() => {
  //     distances.forEach((distance, index) => {
  //       if (distance.isFree) {
  //         form.setValue(`distances.${index}.price`, "0");
  //       }
  //     });
  //   }, [distances, form.setValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="flex items-center gap-2">
            <Paperclip />
            Add resource (optional)
          </h1>
        </CardTitle>
        <CardDescription>
          Add resource to this lesson to help students learn better.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {fields.map((field, index) => {
              return (
                <div
                  key={field.id}
                  className="flex items-end justify-center gap-2 mb-2"
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
                            <Link />
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
              <Button
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="col-span-2 w-full"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" />{" "}
                    <span>Guardando...</span>
                  </>
                ) : (
                  "Guardar recurso"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      {/* <CardFooter>Footer</CardFooter> */}
    </Card>
  );
}
