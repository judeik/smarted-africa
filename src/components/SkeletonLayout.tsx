// src/components/SkeletonLayout.tsx
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
// import { Skeleton } from "@ui/Skeleton"; // shadcn/ui skeleton
import { Skeleton } from "@components/ui/Skeleton";
export default function SkeletonLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Navbar placeholder */}
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-4 shadow-sm"
            >
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="mt-4 h-4 w-3/4" />
              <Skeleton className="mt-2 h-4 w-1/2" />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
