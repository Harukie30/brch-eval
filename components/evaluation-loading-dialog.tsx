"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

export function LoadingPopup({
  open,
  title,
  description,
}: {
  open: boolean
  title: string
  description: string
}) {
  return (
    <Dialog open={open} disablePointerDismissal>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden p-0 sm:max-w-sm"
      >
        <div
          className="flex flex-col items-center px-6 py-10 text-center"
          role="status"
          aria-live="polite"
        >
          <div className="mb-5 size-12 animate-spin rounded-full border-4 border-sky-100 border-t-sky-600" />
          <DialogTitle className="text-2xl leading-tight tracking-tight">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-2 text-base leading-relaxed">
            {description}
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function EvaluationLoadingDialog({ href }: { href: string }) {
  const router = useRouter()
  const started = useRef(false)
  const [open, setOpen] = useState(false)

  function start() {
    if (started.current) return
    started.current = true
    setOpen(true)
    window.setTimeout(() => {
      router.push(href)
    }, 900)
  }

  return (
    <>
      <Button className="h-12 w-full text-base" size="lg" onClick={start}>
        Start evaluation
      </Button>
      <LoadingPopup
        open={open}
        title="Starting your evaluation"
        description="This will only take a moment."
      />
    </>
  )
}
