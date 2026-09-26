import { LandingSkeleton } from "@/components/landing-skeleton"

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col bg-sky-100">
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <LandingSkeleton />
      </main>
    </div>
  )
}
