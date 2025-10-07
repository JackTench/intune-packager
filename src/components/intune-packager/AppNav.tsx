import { Button } from "../ui/button";
import { invoke } from "@tauri-apps/api/core";
import { SquareTerminal } from "lucide-react";

export default function AppNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-gray-800 px-4 py-2">
      <div className="flex items-center">
        <LeftNav />
      </div>
      <div className="flex items-center">
        <RightNav />
      </div>
    </nav>
  );
}

function LeftNav() {
  return (
    <div className="flex items-center">
      <img src="logo.png" width={32} height={32} alt="Intune Packager" />
      <span className="font-semibolt px-4 text-xl text-gray-400">
        Intune Packager
      </span>
    </div>
  );
}

function RightNav() {
  const handleClick = () => {
    // Call Rust backend to open a command prompt and run the content prep tool.
    invoke("launch_win32_content_prep_tool");
  };

  return (
    <div>
      <Button onClick={handleClick} className="bg-blue-500 hover:bg-red-400">
        <SquareTerminal />
        Launch CLI
      </Button>
    </div>
  );
}
