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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Palette, Loader2 } from "lucide-react";

import { updateColorScheme } from "@/lib/database/actions/user.actions";
import { toast } from "sonner";
import { COLOR_SCHEMES } from "@/constants";

const formSchema = z.object({
  colorScheme: z.string(),
});

type ColorSchemeProps = {
  colorScheme?: string;
  userId: string;
};

export function ColorSchemeForm({ colorScheme, userId }: ColorSchemeProps) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: colorScheme
      ? { colorScheme: colorScheme }
      : { colorScheme: "theme-yellow" },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const userData = { ...values };
    const updatedUser = await updateColorScheme(userId, userData.colorScheme);

    if (updatedUser) {
      toast.success("Scheme updated correctly");
    } else {
      toast.error("There was an error updating the scheme");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 space-y-8"
      >
        <FormField
          control={form.control}
          name="colorScheme"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Color Scheme</FormLabel>
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the color scheme" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COLOR_SCHEMES.map((scheme) => {
                      return (
                        <SelectItem value={scheme}>
                          {scheme.split("-")[1][0].toUpperCase()}
                          {scheme.split("-")[1].slice(1)}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="col-span-2 w-full"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 animate-spin" /> <span>Saving...</span>
            </>
          ) : (
            <>
              <span>Save</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
