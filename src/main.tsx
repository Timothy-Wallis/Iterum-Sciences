import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import '../styles.css'
import '../loadingStyle.css'
import StudentApp from './StudentApp.tsx'
import { CTXEngine } from './iframe-game-pkgs/include.ts'

// ============================================================================
// 1. CTX ENGINE CORE SETUPS & INSTANTIATION
// ============================================================================
let engineStarted = false;

const startEngine = async (element: HTMLCanvasElement) => {
  if (engineStarted) {
    return;
  }
  engineStarted = true;

  try {
    const engine = new CTXEngine.Engine(60);
    const canvas = new CTXEngine.Canvas(800, 600, element);
    const entityManager = new CTXEngine.EntityManager();
    const camera = new CTXEngine.Camera({ x: 0, y: 0 }, { x: 800, y: 600 }, 1);
    const textureManager = new CTXEngine.TextureManager();
    const sprite = await textureManager.load("testTexture", "https://picsum.photos/1080/1080");
    const testEntity = new CTXEngine.Entity(50, 50, 500, 500, sprite);

    engine.attachCamera(camera);
    engine.attachEntityManager(entityManager);
    engine.attachCanvas(canvas);
    entityManager.addEntity(testEntity);

    await engine.start(() => {
      testEntity.move({x: 1, y: -1});
    });
  } catch (error) {
    engineStarted = false;
    console.error("Error starting engine:", error);
  }
};

// ============================================================================
// 3. REACT LAYER PACKAGING INTERFACES
// ============================================================================
interface AppProps {
  assignment: string;
  dueDate: string;
  questions: Array<{
    question: string;
    type: "number" | "dropdown" | "checkbox" | "url" | "text" | "multiple-choice" | "radio" | "date" | "file";
    required?: boolean;
    options?: Array<{ label: string; value: string }>;
  }>;
}

const sampleAssignmentData: AppProps = {
  assignment: "Lab 05: Shader Controls & Form Submissions",
  dueDate: "October 10, 2026",
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

// ============================================================================
// 4. REACT APPLICATION BOOTSTRAPPER RENDERER
// ============================================================================
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <StudentApp
      assignment={sampleAssignmentData.assignment}
      dueDate={sampleAssignmentData.dueDate}
      canvasRef={startEngine}
      questions={sampleAssignmentData.questions}
    />
  </StrictMode>,
);
