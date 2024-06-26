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

// ====== COURSE PARAMS
export type CreateCourseParams = {
  title: string;
  description: string;
  instructor: string;
  imageUrl: string;
  isPublished?: boolean;
  category: string;
};

export type DeleteCourseParams = {
  courseId: string;
  path: string;
};

export type UpdateCourseParams = {
  userId: string;
  // course: Partial<ICourse>; // Check the Partial<>
  course: {
    _id: string;
    title: string;
    description: string;
    // instructor: string;
    imageUrl: string;
    isPublished: boolean;
    category: string;
  };
  path: string;
};

export type CourseFormProps = {
  userId: string;
  type: "Create" | "Update";
  course?: ICourse;
  courseId?: string;
};

export const courseDefaultValues = {
  title: "",
  description: "",
  isPublished: false,
  imageUrl: "",
  category: "",
};

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

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type GetAllCoursesParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};
