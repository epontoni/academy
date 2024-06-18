import { ICourse } from "@/lib/database/models/course.model";
import { LucideProps } from "lucide-react";
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
} from "react";

export type MenuItem = {
  href: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export type CreateCourseParams = {
  title: string;
  description: string;
  isPublished: boolean;
  imageUrl: string;
  instructor: string;
  category: string;
};

export type CourseFormProps = {
  userId: string;
  type: "Create" | "Update";
  course?: ICourse;
  courseId?: string;
};

export const courseDefaultValues = {};

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string | null | undefined;
  email: string;
  photo: string;
};

export type Roles = "USER" | "INSTRUCTOR" | "ADMIN";

export type UpdateUserParams = {
  firstName?: string;
  lastName?: string;
  username?: string;
  photo?: string;
  role?: string;
  gender?: string; // Obligatorio para el formulario de actualización, pero opcional para el registro desd clerk
  dob?: Date; // Obligatorio para el formulario de actualización, pero opcional para el registro desd clerk
  country?: string;
  dni?: string;
  phone?: string;
  social?: string;
  city?: string;
  street?: string;
  nStreet?: string;
  piso?: string;
  dpto?: string;
  sportGroup?: string;
  contacto?: string;
  telContacto?: string;

  accessToken?: string;
  tokenType?: string;
  expiresIn?: number;
  scope?: string;
  userId?: string;
  refreshToken?: string;
  publicKey?: string;
};

export type FileUploadProps = {
  imageUrl: string;
  onFileChange: (value: string) => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
  categoryName: string;
};
