import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import AppFileSelect from "./AppFileSelect";
import { Button } from "../ui/button";

export default function AppMainPanel() {
  const [path, setPath] = useState<string | string[] | null>(null);

  const onSubmit = async () => {
    await invoke("package_app", { arg: path });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <p className="text-white text-center">
        Select an executable to package for Intune.
      </p>
      <AppFileSelect
        label="Select file:"
        value={path}
        onChange={(p) => setPath(p as string)}
        filters={[
          {
            name: "Windows Executable",
            extensions: ["exe", "msi", "bat", "ps1"],
          },
        ]}
      />
      <Button className="bg-blue-500" onClick={onSubmit}>
        Save
      </Button>
      <p className="text-gray-400 text-center">
        Note: All files in the folder containing the selected file will be
        included in the Intune package.
      </p>
    </div>
  );
}
