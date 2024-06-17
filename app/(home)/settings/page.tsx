import ColorScheme from "@/components/color-scheme";
import { ColorSchemeForm } from "@/components/color-scheme-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserById } from "@/lib/database/actions/user.actions";
import { auth } from "@clerk/nextjs/server";

export default async function SettingsPage() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.metadata?.userId as string;

  // Initial values for user form
  let initialValues;
  if (userId) {
    initialValues = await getUserById(userId);
  }

  return (
    <div>
      <h1 className="font-bold">Settings</h1>
      <Card className="my-4">
        <CardHeader>
          <CardTitle>Color scheme</CardTitle>
          <CardDescription>
            Select the color scheme for the interface.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ColorSchemeForm
            userId={userId}
            colorScheme={initialValues?.colorScheme}
          />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
