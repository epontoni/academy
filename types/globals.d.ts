import { UserRole } from "@/types";

export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      userId: string;
      role?: Roles;
    };
  }
}
