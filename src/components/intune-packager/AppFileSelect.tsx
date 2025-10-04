import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AppFileSelectProps {
  label?: string;
}

export default function AppFileSelect({
  label = "Select file:",
}: AppFileSelectProps) {
  return (
    <div className="px-8">
      <span className="text-white">{label}</span>
      <div className="flex">
        <Input />
        <Button className="bg-gray-200 hover:bg-blue-200 text-black">
          Open
        </Button>
      </div>
    </div>
  );
}
