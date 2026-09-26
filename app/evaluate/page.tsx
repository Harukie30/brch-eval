import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { branchFromQuery } from "@/lib/branch"

export default async function EvaluatePage({
  searchParams,
}: {
  searchParams: Promise<{ branch?: string | string[] }>
}) {
  const { branch: branchParam } = await searchParams
  const branch = branchFromQuery(branchParam)

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-10">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            {branch ?? "Customer evaluation"}
          </Badge>
          <CardTitle className="text-2xl leading-tight tracking-tight">
            Evaluation
          </CardTitle>
          <CardDescription className="text-base leading-relaxed">
            The questions for this visit will go here next.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="h-12 w-full text-base"
            size="lg"
            variant="outline"
            nativeButton={false}
            render={
              <Link
                href={
                  branch ? `/?branch=${encodeURIComponent(branch)}` : "/"
                }
              />
            }
          >
            Back
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
