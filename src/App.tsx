import { useState } from "react";
import AppFileSelect from "./components/intune-packager/AppFileSelect";
import AppNav from "./components/intune-packager/AppNav";
import { Button } from "./components/ui/button";
import { invoke } from "@tauri-apps/api/core";

export default function App() {
  const [path, setPath] = useState<string | string[] | null>(null);

  const onSubmit = async () => {
    // call rust here.
    await invoke("package_app", { arg: path });
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-gray-700 to-sky-900">
      <AppNav />
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <p className="text-white text-center">The body content goes here.</p>
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
          Submit
        </Button>
        <p className="text-gray-400 text-center">
          Note: All files in the folder containing the selected file will be
          included in the Intune package.
        </p>
      </div>
    </div>
  );
}
