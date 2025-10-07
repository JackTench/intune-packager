import AppNav from "./components/intune-packager/AppNav";
import AppMainPanel from "./components/intune-packager/AppMainPanel";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-tr from-gray-700 to-sky-900">
      <AppNav />
      <AppMainPanel />
    </div>
  );
}
