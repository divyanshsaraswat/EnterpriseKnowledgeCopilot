import Link from "next/link"
import { ArrowRight, Upload, HelpCircle, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Your AI-Powered Company Knowledge Assistant
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Unlock the power of your organization&apos;s knowledge with our intelligent assistant. Upload documents,
                ask questions, and get accurate answers instantly.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="gap-1">
                <Link href="/upload">
                  <Upload className="h-4 w-4" />
                  Upload Docs
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-1 bg-transparent">
                <Link href="/ask">
                  <HelpCircle className="h-4 w-4" />
                  Ask a Question
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Enterprise Knowledge at Your Fingertips
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our AI-powered platform transforms how your organization accesses and utilizes knowledge.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Upload Documents</h3>
                <p className="text-muted-foreground">
                  Easily upload and index your company&apos;s documents for instant access.
                </p>
              </div>
              <Button asChild variant="ghost" className="justify-start px-0">
                <Link href="/upload" className="flex items-center gap-1">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Chat Interface</h3>
                <p className="text-muted-foreground">
                  Have natural conversations with your knowledge base through our intuitive chat interface.
                </p>
              </div>
              <Button asChild variant="ghost" className="justify-start px-0">
                <Link href="/chat" className="flex items-center gap-1">
                  Start Chatting <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Ask Questions</h3>
                <p className="text-muted-foreground">
                  Get precise answers to your questions with citations from your company&apos;s knowledge base.
                </p>
              </div>
              <Button asChild variant="ghost" className="justify-start px-0">
                <Link href="/ask" className="flex items-center gap-1">
                  Ask Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
