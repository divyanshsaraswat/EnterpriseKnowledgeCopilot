"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, FileText, Check, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"

type FileWithPreview = {
  file: File
  id: string
  preview?: string
}

type UploadStatus = "idle" | "uploading" | "success" | "error"

export default function UploadPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [category, setCategory] = useState("")
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    const newFiles = Array.from(e.target.files).map((file) => ({
      file,
      id: crypto.randomUUID(),
    }))

    setFiles((prev) => [...prev, ...newFiles])
    e.target.value = ""
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!files.length) {
      setErrorMessage("Please select at least one file to upload")
      setUploadStatus("error")
      return
    }

    if (!category) {
      setErrorMessage("Please select a category")
      setUploadStatus("error")
      return
    }

    setUploadStatus("uploading")

    // Simulate upload process
    setTimeout(() => {
      // TODO: call POST /upload with files and category
      console.log("Uploading files:", files, "Category:", category)
      setUploadStatus("success")

      // Reset form after success
      setTimeout(() => {
        setFiles([])
        setCategory("")
        setUploadStatus("idle")
      }, 3000)
    }, 2000)
  }

  return (
    <div className="container max-w-4xl py-8 md:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Upload Documents</h1>
        <p className="text-muted-foreground">
          Upload your company documents to make them searchable and accessible through our AI assistant.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* File upload area */}
        <Card className="border-dashed">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Upload className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Upload your files</h3>
                <p className="text-sm text-muted-foreground">Drag and drop files here or click to browse</p>
                <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, TXT (Max 50MB per file)</p>
              </div>
              <Input
                type="file"
                multiple
                accept=".pdf,.docx,.txt"
                className="hidden"
                id="file-upload"
                onChange={handleFileChange}
                disabled={uploadStatus === "uploading"}
              />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Select Files
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* File list */}
        {files.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Selected Files ({files.length})</h3>
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between rounded-md border bg-background p-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{file.file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.id)}
                    disabled={uploadStatus === "uploading"}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove file</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category selection */}
        <div className="space-y-2">
          <Label htmlFor="category">Document Category</Label>
          <Select value={category} onValueChange={setCategory} disabled={uploadStatus === "uploading"}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="policies">Company Policies</SelectItem>
              <SelectItem value="hr">HR Documents</SelectItem>
              <SelectItem value="product">Product Documentation</SelectItem>
              <SelectItem value="marketing">Marketing Materials</SelectItem>
              <SelectItem value="legal">Legal Documents</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status alerts */}
        {uploadStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {uploadStatus === "success" && (
          <Alert className="border-green-500 bg-green-500/10 text-green-500">
            <Check className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your files have been uploaded successfully and are being processed.</AlertDescription>
          </Alert>
        )}

        {/* Submit button */}
        <Button type="submit" className="w-full" disabled={uploadStatus === "uploading" || uploadStatus === "success"}>
          {uploadStatus === "uploading" ? (
            <>
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              Uploading...
            </>
          ) : (
            "Upload Documents"
          )}
        </Button>
      </form>
    </div>
  )
}
