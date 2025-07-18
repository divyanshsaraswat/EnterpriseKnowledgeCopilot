
# 🧠 Enterprise Knowledge Copilot

An AI-powered internal assistant for businesses that allows employees to query company knowledge, summarize documents, and automate internal workflows using large language models (LLMs) and retrieval-augmented generation (RAG).

## 🌐 Live Demo

*Coming soon or deploy locally using instructions below.*

---

## 🚀 Features

- 🔍 Ask natural language questions over internal documents
- 📁 Upload and process PDFs, DOCXs, and text files
- 🧠 Uses RAG (Retrieval-Augmented Generation) to provide accurate answers with sources
- 🤖 AI Chatbot interface similar to ChatGPT
- 🧩 Modular frontend built with React (via v0.dev) and TailwindCSS
- 🔧 FastAPI-based backend for LLM calls, embeddings, and document ingestion

---

## 📁 Project Structure

```
/frontend         # React + Tailwind UI generated from v0.dev
/backend          # FastAPI application with endpoints: /chat, /ask, /upload
/vectorstore      # Stores embedded document chunks (e.g. ChromaDB or Weaviate)
/uploads          # Stores raw uploaded files
```

---

## 📦 Tech Stack

- **Frontend**: React, TailwindCSS, Chatbot UI
- **Backend**: FastAPI, LangChain, LlamaIndex
- **LLMs**: OpenAI GPT-4, Claude, Mistral (optional)
- **Embeddings**: OpenAI / HuggingFace
- **Vector DB**: ChromaDB, Weaviate, or Pinecone
- **Deployment**: Docker, AWS/GCP ready

---

## 🔧 API Endpoints

- `POST /upload` – Upload and embed company documents
- `POST /ask` – Query embedded data with a question
- `POST /chat` – Conversational interface using LLMs

---

## 🛠️ Setup Instructions

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Example Use Cases

- “What is the leave policy for the EU team?”
- “Summarize this PDF onboarding guide.”
- “Compare the 2024 OKRs of engineering vs product teams.”
- “Generate a Jira ticket from this Slack export.”

---

## 🧱 Future Enhancements

- Auth integration (SSO / Google)
- Slack or MS Teams bot integration
- Fine-tuned models for tone/persona
- Real-time feedback loop on AI responses

---

## 📝 License

MIT License

---

> Built to save employees from digging through endless documentation.
