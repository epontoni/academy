"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteEvent } from "@/lib/database/actions/course.actions";
import { Trash } from "lucide-react";

type DeleteConfirmationProps = {
  courseId: string;
};

export default function DeleteConfirmation({
  courseId,
}: DeleteConfirmationProps) {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash className="w-5 h-5 hover:text-rose-500" />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-background">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Está seguro que desea borrar el curso?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            Esto borrará permanentemente el curso y no se podrá recuperar.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteEvent({ courseId, path: pathname });
              })
            }
          >
            {isPending ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
