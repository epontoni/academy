import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div>
      <form action="" className="flex gap-2">
        <Input />
        <Button>
          <Search />
        </Button>
      </form>
    </div>
  );
}
