import { invoke } from "@tauri-apps/api/core";
import { Button } from "./components/ui/button";

function launch() {
  invoke("launch_win32_content_prep_tool");
}

export default function App() {
  return (
    <div>
      <img src="logo.png" />
      <h1>Intune Packager</h1>
      <Button onClick={launch}>Launch Win32 Content Prep Tool</Button>
    </div>
  );
}
