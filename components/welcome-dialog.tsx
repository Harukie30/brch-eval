"use client"

import { Store01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

const steps = [
  {
    title: "Rate your visit",
    detail: "Service, staff, and the place.",
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

export function WelcomeDialog({ branch }: { branch: string | null }) {
  return (
    <Dialog defaultOpen disablePointerDismissal>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden p-0 sm:max-w-md"
      >
        <div className="bg-sky-100 px-6 pt-8 pb-6">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-white text-foreground shadow-sm">
            <HugeiconsIcon icon={Store01Icon} size={24} strokeWidth={1.5} />
          </div>
          <Badge variant="secondary" className="w-fit bg-white">
            {branch ?? "Customer evaluation"}
          </Badge>
          <DialogTitle className="mt-3 text-2xl leading-tight tracking-tight">
            Welcome
          </DialogTitle>
          <DialogDescription className="mt-2 text-base leading-relaxed text-sky-950/70">
            {branch
              ? `Tell ${branch} how this visit went.`
              : "Tell this branch how your visit went."}
          </DialogDescription>
        </div>
        <div className="flex flex-col gap-4 px-6 py-5">
          {steps.map((step, index) => (
            <div key={step.title} className="flex gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-medium text-sky-950">
                {index + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="font-medium text-foreground">{step.title}</p>
                <p className="text-muted-foreground">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6">
          <DialogClose
            render={<Button className="h-12 w-full text-base" size="lg" />}
          >
            Continue
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
