// src/components/Loader.tsx
import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      <span className="ml-2 text-gray-700 text-lg">Loading...</span>
    </div>
  );
}
