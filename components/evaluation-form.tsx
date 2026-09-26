"use client"

import { useState } from "react"
import Link from "next/link"
import { Tick02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldTitle } from "@/components/ui/field"
import { LoadingPopup } from "@/components/evaluation-loading-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const questions = [
  {
    key: "service",
    label: "How was the service?",
    short: "Service",
    placeholder: "Anything about the service?",
  },
  {
    key: "staff",
    label: "How was the staff?",
    short: "Staff",
    placeholder: "Anything about the staff?",
  },
  {
    key: "place",
    label: "How was the place?",
    short: "Place",
    placeholder: "Anything about the place?",
  },
] as const

const scale = [
  {
    value: "1",
    idle: "border-red-200 bg-red-50 text-red-700",
    selected: "border-red-600 bg-red-600 text-white",
  },
  {
    value: "2",
    idle: "border-orange-200 bg-orange-50 text-orange-700",
    selected: "border-orange-500 bg-orange-500 text-white",
  },
  {
    value: "3",
    idle: "border-yellow-200 bg-yellow-50 text-yellow-800",
    selected: "border-yellow-400 bg-yellow-400 text-yellow-950",
  },
  {
    value: "4",
    idle: "border-blue-200 bg-blue-50 text-blue-700",
    selected: "border-blue-600 bg-blue-600 text-white",
  },
  {
    value: "5",
    idle: "border-green-200 bg-green-50 text-green-700",
    selected: "border-green-600 bg-green-600 text-white",
  },
]

type RatingKey = (typeof questions)[number]["key"]

const emptyRatings: Record<RatingKey, string> = {
  service: "",
  staff: "",
  place: "",
}

export function EvaluationForm({ branch }: { branch: string | null }) {
  const [ratings, setRatings] = useState(emptyRatings)
  const [notes, setNotes] = useState(emptyRatings)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const ready = questions.every((question) => ratings[question.key] !== "")
  const homeHref = branch ? `/?branch=${encodeURIComponent(branch)}` : "/"

  if (sent) {
    return (
      <Card className="w-full max-w-md gap-0 overflow-hidden py-0">
        <div className="bg-sky-100 px-6 pt-8 pb-6">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-white text-green-600 shadow-sm">
            <HugeiconsIcon icon={Tick02Icon} size={24} strokeWidth={2} />
          </div>
          <Badge variant="secondary" className="w-fit bg-white">
            {branch ?? "Customer evaluation"}
          </Badge>
          <CardTitle className="mt-3 text-2xl leading-tight tracking-tight">
            Thank you
          </CardTitle>
          <CardDescription className="mt-2 text-base leading-relaxed">
            {branch
              ? `Your rating for ${branch} is complete.`
              : "Your rating for this visit is complete."}
          </CardDescription>
        </div>
        <div className="flex flex-col gap-3 px-6 py-5">
          {questions.map((question) => {
            const score = scale.find(
              (option) => option.value === ratings[question.key]
            )
            const note = notes[question.key].trim()

            return (
              <div key={question.key} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-foreground">{question.short}</p>
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-xl border text-sm font-medium",
                      score?.selected
                    )}
                  >
                    {score?.value}
                  </span>
                </div>
                {note ? (
                  <p className="rounded-xl bg-muted px-3 py-3 text-muted-foreground">
                    {note}
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>
        <div className="px-6 pb-6">
          <Button
            className="h-12 w-full text-base"
            size="lg"
            nativeButton={false}
            render={<Link href={homeHref} />}
          >
            Done
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <Badge variant="secondary" className="w-fit">
          {branch ?? "Customer evaluation"}
        </Badge>
        <CardTitle className="text-2xl leading-tight tracking-tight">
          Rate this visit
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          1 is poor. 5 is excellent. A note under each rating is optional.
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (!ready || sending) return
          setSending(true)
          window.setTimeout(() => setSent(true), 900)
        }}
      >
        <CardContent>
          <FieldGroup className="gap-6">
            {questions.map((question) => (
              <Field key={question.key}>
                <FieldTitle className="text-base">{question.label}</FieldTitle>
                <RadioGroup
                  name={question.key}
                  value={ratings[question.key]}
                  onValueChange={(value) =>
                    setRatings((current) => ({
                      ...current,
                      [question.key]: String(value),
                    }))
                  }
                  aria-label={question.label}
                  className="grid grid-cols-5 gap-2"
                >
                  {scale.map((score) => (
                    <label
                      key={score.value}
                      className={cn(
                        "flex h-11 cursor-pointer items-center justify-center rounded-xl border text-sm font-medium",
                        ratings[question.key] === score.value
                          ? score.selected
                          : score.idle
                      )}
                    >
                      <RadioGroupItem value={score.value} className="sr-only" />
                      {score.value}
                    </label>
                  ))}
                </RadioGroup>
                <Textarea
                  id={`${question.key}-note`}
                  name={`${question.key}-note`}
                  value={notes[question.key]}
                  onChange={(event) =>
                    setNotes((current) => ({
                      ...current,
                      [question.key]: event.target.value,
                    }))
                  }
                  placeholder={question.placeholder}
                  aria-label={question.placeholder}
                />
              </Field>
            ))}
          </FieldGroup>
        </CardContent>
        <CardFooter className="border-t">
          <Button
            type="submit"
            className="h-12 w-full text-base"
            size="lg"
            disabled={!ready || sending}
          >
            Send evaluation
          </Button>
        </CardFooter>
      </form>
      <LoadingPopup
        open={sending}
        title="Sending your evaluation"
        description="This will only take a moment."
      />
    </Card>
  )
}
