"use client"

import type React from "react"

import { useState } from "react"
import { Send, FileText, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type ResponseTone = "formal" | "casual" | "bullet"
type AnswerStatus = "idle" | "loading" | "complete"

type Source = {
  id: string
  title: string
  type: string
  url?: string
}

type Answer = {
  content: string
  sources: Source[]
}

export default function AskPage() {
  const [question, setQuestion] = useState("")
  const [tone, setTone] = useState<ResponseTone>("formal")
  const [status, setStatus] = useState<AnswerStatus>("idle")
  const [answer, setAnswer] = useState<Answer | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim()) return

    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      // TODO: call POST /ask with question and tone
      console.log("Asking:", question, "Tone:", tone)

      // Simulate response
      const dummyAnswer: Answer = {
        content:
          tone === "bullet"
            ? "• Based on company policy, remote work is allowed up to 3 days per week.\n• Employees must coordinate with their team leads.\n• Core hours of 10am-3pm must be observed regardless of location.\n• VPN must be used for accessing company resources remotely."
            : "Based on our company policy documentation, employees are permitted to work remotely for up to 3 days per week. This flexibility is designed to promote work-life balance while maintaining team cohesion. However, all remote work arrangements must be coordinated with team leads to ensure adequate coverage in the office. Additionally, all employees, regardless of location, are expected to be available during core hours (10am-3pm in your local time zone). When working remotely, employees must use the company VPN to access internal resources securely.",
        sources: [
          {
            id: "1",
            title: "Employee Handbook 2023",
            type: "PDF",
            url: "#",
          },
          {
            id: "2",
            title: "Remote Work Policy",
            type: "DOCX",
            url: "#",
          },
          {
            id: "3",
            title: "IT Security Guidelines",
            type: "PDF",
            url: "#",
          },
        ],
      }

      setAnswer(dummyAnswer)
      setStatus("complete")
    }, 2000)
  }

  return (
    <div className="container max-w-4xl py-8 md:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Ask a Question</h1>
        <p className="text-muted-foreground">
          Ask any question about your company knowledge and get accurate answers with cited sources.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="question">Your Question</Label>
          <Textarea
            id="question"
            placeholder="Ask any question about company knowledge..."
            className="min-h-[100px] resize-none"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={status === "loading"}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tone">Response Tone</Label>
          <Select
            value={tone}
            onValueChange={(value) => setTone(value as ResponseTone)}
            disabled={status === "loading"}
          >
            <SelectTrigger id="tone">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="bullet">Bullet Points</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full" disabled={!question.trim() || status === "loading"}>
          {status === "loading" ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Generating Answer...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Get Answer
            </>
          )}
        </Button>
      </form>

      {/* Answer display */}
      {status === "complete" && answer && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Answer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="whitespace-pre-line">{answer.content}</div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Sources</h3>
              <div className="space-y-2">
                {answer.sources.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between rounded-md border bg-background p-3"
                  >
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{source.title}</p>
                        <Badge variant="outline" className="mt-1">
                          {source.type}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={source.url}>
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View source</span>
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
