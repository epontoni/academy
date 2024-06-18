"use client";

import { useCallback } from "react";

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
//import type { FileWithPath } from "@uploadthing/react";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import { convertFileToUrl } from "@/lib/utils";
import { FileUploadProps } from "@/types";

//import { useUploadThing } from "@/lib/uploadthing";

export default function FileUpload({
  imageUrl,
  onFileChange,
  setFiles,
}: FileUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFileChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  /*const { startUpload, permittedFileInfo } = useUploadThing(
    "myUploadEndpoint",
    {
      onClientUploadComplete: () => {
        alert("uploaded successfully!");
      },
      onUploadError: () => {
        alert("error occurred while uploading");
      },
      onUploadBegin: () => {
        alert("upload has begun");
      },
    }
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];
*/

  const fileTypes = "image/*";

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept([fileTypes]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex flex-col py-5 text-muted-foreground text-center justify-center align-middle">
          <CloudUpload className="w-10 h-10 mx-auto" />
          <h3 className="mb-2 mt-2">Arrastrar y soltar aquí</h3>
          <p className="text-sm text-muted-foreground mb-4">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full">
            Seleccionar desde la computadora
          </Button>
        </div>
      )}
    </div>
  );
}
