import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, currentUser } from "@clerk/nextjs/server";
import { SignIn, SignOutButton } from "@clerk/nextjs";
import { MENU_ITEMS } from "@/constants";
import Link from "next/link";
import { DoorClosed } from "lucide-react";

export default async function UserMenu() {
  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();

  if (!user) return <SignIn />;

  const {
    firstName,
    lastName,
    imageUrl,
    emailAddresses: [{ emailAddress }],
  } = user as User;

  // Avatar FallBack
  const AF = `${firstName ? firstName[0] : "?"} ${
    lastName ? lastName[0] : "?"
  }`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={imageUrl} alt={`${firstName} ${lastName}`} />
            <AvatarFallback>{AF}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {MENU_ITEMS.map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              <Link href={item.href} className="w-full flex justify-between">
                {item.label}
                <item.icon className="w-5 h-5 mr-2 text-primary" />
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOutButton redirectUrl="/">
            <div className="w-full flex justify-between items-center">
              <span className="w-full">Sign out</span>
              <DoorClosed className="w-5 h-5 mr-2 text-primary" />
            </div>
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
