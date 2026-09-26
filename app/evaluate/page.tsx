import { EvaluationForm } from "@/components/evaluation-form"
import { branchFromQuery } from "@/lib/branch"

export default async function EvaluatePage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string | string[] }>
}) {
  const { branch: branchParam } = await searchParams
  const branch = branchFromQuery(branchParam)

  return (
    <div className="flex flex-1 flex-col bg-sky-100">
      <main className="flex flex-1 justify-center px-4 py-12">
        <EvaluationForm branch={branch} />
      </main>
      <footer className="px-4 pb-6 text-center text-sm text-sky-950/70">
        Branch evaluation · Your feedback stays with this branch
      </footer>
    </div>
  )
}
