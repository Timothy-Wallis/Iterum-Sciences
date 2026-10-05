import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import App from './App.tsx'
import '../styles.css'
import '../loadingStyle.css'
import StudentApp from './StudentApp.tsx'


//Ai generated test code 
const sampleAssignmentData: AppProps = {
  assignment: "Lab 05: Shader Controls & Form Submissions",
  dueDate: "October 10, 2026",
  iframeUrl: "https://example.com/embed/lab05",
  questions: [
    {
      question: "Which coordinate space comes immediately after Object Space?",
      type: "dropdown",
      required: true,
      options: [
        { label: "World Space", value: "world" },
        { label: "View Space", value: "view" },
        { label: "Clip Space", value: "clip" }
      ]
    },
    {
      question: "Select all features supported by Vulkan:",
      type: "checkbox",
      options: [
        { label: "Explicit Memory Management", value: "explicit_mem" },
        { label: "Multi-threaded Command Buffer Recording", value: "multithread" },
        { label: "Automatic Garbage Collection", value: "gc" }
      ]
    },
    {
      question: "Provide your lab repository submission URL:",
      type: "url",
      required: true
    }
  ]
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <StudentApp
      assignment={sampleAssignmentData.assignment}
      dueDate={sampleAssignmentData.dueDate}
      iframeUrl={sampleAssignmentData.iframeUrl}
      questions={sampleAssignmentData.questions}
    />
  </StrictMode>,
)