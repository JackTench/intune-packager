import { invoke } from "@tauri-apps/api/core";

function launch() {
  invoke("launch_win32_content_prep_tool");
}

export default function App() {
  return (
    <div>
      <img src="logo.png" />
      <h1>Intune Packager</h1>
      <button onClick={launch}>Launch Win32 Content Prep Tool</button>
    </div>
  );
}
