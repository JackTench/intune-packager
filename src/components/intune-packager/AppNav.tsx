import { SquareTerminal } from "lucide-react";
import { Button } from "../ui/button";

export default function AppNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b px-4 py-2 bg-gray-800">
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
      <span className="text-xl text-gray-400 font-semibolt px-4">
        Intune Packager
      </span>
    </div>
  );
}

function RightNav() {
  return (
    <div>
      <Button className="bg-blue-500 hover:bg-red-400">
        <SquareTerminal />
        Launch CLI
      </Button>
    </div>
  );
}
