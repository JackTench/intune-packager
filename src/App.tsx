import AppFileSelect from "./components/intune-packager/AppFileSelect";
import AppNav from "./components/intune-packager/AppNav";

export default function App() {
  return (
    <div className="min-h-screen bg-linear-to-tr from-gray-700 to-sky-900">
      <AppNav />
      <div>
        <p className="text-white">The body content goes here.</p>
        <AppFileSelect />
        <AppFileSelect label="Test:" />
      </div>
    </div>
  );
}
