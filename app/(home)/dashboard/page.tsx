import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-bold">Dashboard</h1>
      <Button asChild>
        <Link href="/dashboard/create">Create new course</Link>
      </Button>
    </div>
  );
}
