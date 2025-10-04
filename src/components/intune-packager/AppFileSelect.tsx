import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface AppFileSelectProps {
  label?: string;
}

export default function AppFileSelect({
  label = "Select file:",
}: AppFileSelectProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="px-8">
      <span className="text-white">{label}</span>
      <div className="flex">
        <Input
          className="flex-1 rounded-r-none"
          value={fileName || "No file chosen."}
          readOnly
        />
        <Button
          type="button"
          onClick={handleButtonClick}
          className="rounded-l-none bg-gray-200 hover:bg-blue-200 text-black"
        >
          Open
        </Button>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
