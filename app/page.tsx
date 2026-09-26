import { Store01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Suspense } from "react"

import { EvaluationLoadingDialog } from "@/components/evaluation-loading-dialog"
import { LandingSkeleton } from "@/components/landing-skeleton"
import { WelcomeDialog } from "@/components/welcome-dialog"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { branchFromQuery } from "@/lib/branch"

const steps = [
  {
    title: "Rate your visit",
    detail: "Service, staff, and the place itself.",
  },
  {
    title: "Add a comment",
    detail: "Only if something should be said.",
  },
  {
    title: "Send it",
    detail: "About a minute. No account needed.",
  },
]

export default function Page({ searchParams }: PageProps<"/">) {
  return (
    <div className="flex flex-1 flex-col bg-sky-100">
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Suspense fallback={<LandingSkeleton />}>
          <Landing searchParams={searchParams} />
        </Suspense>
      </main>
      <footer className="px-4 pb-6 text-center text-sm text-sky-950/70">
        Branch evaluation · Your feedback stays with this branch
      </footer>
    </div>
  )
}

async function Landing({
  searchParams,
}: {
  searchParams: PageProps<"/">["searchParams"]
}) {
  const { branch: branchParam } = await searchParams
  const branch = branchFromQuery(branchParam)
  const startHref = branch
    ? `/evaluate?branch=${encodeURIComponent(branch)}`
    : "/evaluate"

  return (
    <>
    <WelcomeDialog branch={branch} />
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="mb-1 flex size-12 items-center justify-center rounded-2xl bg-muted text-foreground">
          <HugeiconsIcon icon={Store01Icon} size={24} strokeWidth={1.5} />
        </div>
        <Badge variant="secondary" className="w-fit">
          {branch ?? "Customer evaluation"}
        </Badge>
        <CardTitle className="text-2xl leading-tight tracking-tight">
          How was your visit?
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          Tell this branch what went well and what should be better next time.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Separator />
        <div className="flex flex-col gap-4">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {index + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-medium text-foreground">{step.title}</p>
                <p className="text-muted-foreground">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t">
        <EvaluationLoadingDialog href={startHref} />
      </CardFooter>
    </Card>
    </>
  )
}
