import { useMemo } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { open } from "@tauri-apps/plugin-dialog";

type PathLike = string | string[] | null;

interface AppFileSelectProps {
  label?: string;
  value: PathLike;
  onChange: (path: PathLike) => void;
  multiple?: boolean;
  filters?: { name: string; extensions: string[] }[];
}

export default function AppFileSelect({
  label = "Select file:",
  value,
  onChange,
  multiple = false,
  filters,
}: AppFileSelectProps) {
  // Value to display in the file select box.
  const display = useMemo(() => {
    if (!value) return "No file chosen.";
    if (Array.isArray(value)) {
      return value.map((p) => p.split(/[\\/]/).pop()).join(", ");
    }
    return value.split(/[\\/]/).pop();
  }, [value]);

  const handlePick = async () => {
    const result = await open({
      multiple,
      filters,
    });
    if (result === null) return;
    onChange(result as any);
  };

  return (
    <div className="px-8 space-y-2">
      <span className="text-white">{label}</span>
      <div className="flex items-center">
        <Input className="flex-1 rounded-r-none" value={display} readOnly />
        <Button
          type="button"
          onClick={handlePick}
          className="rounded-l-none bg-gray-200 hover:bg-blue-200 text-black"
        >
          Open
        </Button>
      </div>
    </div>
  );
}
