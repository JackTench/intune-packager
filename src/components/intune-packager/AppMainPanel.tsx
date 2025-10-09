import { useState } from "react";

import { Button } from "../ui/button";
import AppFileSelect from "./AppFileSelect";
import { invoke } from "@tauri-apps/api/core";

export default function AppMainPanel() {
  // State management for path selected.
  const [path, setPath] = useState<string | string[] | null>(null);

  const onSubmit = async () => {
    // Invoke the Rust code that calls the content prep tool.
    await invoke("js_package_app", { arg: path });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <p className="text-center text-white">
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
      <p className="text-center text-sm text-gray-400">
        Note: All files in the folder containing the selected file will be
        included in the Intune package.
      </p>
    </div>
  );
}
