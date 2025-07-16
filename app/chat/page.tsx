"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Dummy data for past conversations
const pastConversations = [
  { id: 1, title: "Company policies", date: "Today" },
  { id: 2, title: "Product roadmap", date: "Yesterday" },
  { id: 3, title: "HR guidelines", date: "2 days ago" },
  { id: 4, title: "Onboarding process", date: "1 week ago" },
  { id: 5, title: "Marketing strategy", date: "2 weeks ago" },
]

// Message type definition
type Message = {
  id: number
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your Enterprise Knowledge Assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      // TODO: call POST /chat with user prompt
      const aiMessage: Message = {
        id: messages.length + 2,
        content: `I've found some information related to your query about "${input}". According to our company knowledge base, this is something we can help with.`,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col md:flex-row">
      {/* Sidebar with past conversations */}
      <div className="w-full border-r md:w-64 lg:w-80">
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold">Past Conversations</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-1 pr-4">
              {pastConversations.map((conversation) => (
                <Button key={conversation.id} variant="ghost" className="w-full justify-start text-left">
                  <div className="flex flex-col items-start">
                    <span className="line-clamp-1">{conversation.title}</span>
                    <span className="text-xs text-muted-foreground">{conversation.date}</span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex flex-1 flex-col">
        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-max max-w-[80%] flex-col rounded-lg px-4 py-2",
                  message.sender === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                <p>{message.content}</p>
                <span
                  className={cn(
                    "mt-1 text-xs",
                    message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground",
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex w-max max-w-[80%] flex-col rounded-lg bg-muted px-4 py-2">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        {/* Input area */}
        <div className="p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
