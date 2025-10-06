import { useState } from "react";
import AppFileSelect from "./components/intune-packager/AppFileSelect";
import AppNav from "./components/intune-packager/AppNav";
import { Button } from "./components/ui/button";
import { invoke } from "@tauri-apps/api/core";

export default function App() {
  const [path, setPath] = useState<string | string[] | null>(null);

  const onSubmit = async () => {
    // call rust here.
    await invoke("test_print", { arg: path });
  };

  return (
    <div className="min-h-screen bg-linear-to-tr from-gray-700 to-sky-900">
      <AppNav />
      <div>
        <p className="text-white">The body content goes here.</p>
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
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
}
