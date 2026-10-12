import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import '../styles.css'
import '../loadingStyle.css'
import StudentApp from './StudentApp.tsx'
import { CTXEngine } from './iframe-game-pkgs/include.ts'
import brownMothTextureUrl from './assets/GameAssets1-Test/brown-moth.png'
import whiteMothTextureUrl from './assets/GameAssets1-Test/white-moth.png'

let engineStarted = false;
const textureManager = new CTXEngine.TextureManager();
const spriteLoader = async () => {
  try {
    await textureManager.load('brown_bug', brownMothTextureUrl);
    await textureManager.load('white_bug', whiteMothTextureUrl);
  } catch (error) {
    console.error('Failed to load assignment sprite.', error);
  }
}

const startEngine = async (element: HTMLCanvasElement) => {
  if (engineStarted) {
    return;
  }
  engineStarted = true;

  try {
    const engine = new CTXEngine.Engine(144);
    const canvas = new CTXEngine.Canvas(800, 600, element);
    const entityManager = new CTXEngine.EntityManager();
    const camera = new CTXEngine.Camera({ x: 0, y: 0 }, { x: 800, y: 600 }, 1);
    await spriteLoader();
    const testEntity = new CTXEngine.Entity(50, 50, 80, 80, textureManager.get("brown_bug"));
    const testEntity2 = new CTXEngine.Entity(100, 100, 80, 80, textureManager.get("white_bug"));

    engine.attachCamera(camera);
    engine.attachEntityManager(entityManager);
    engine.attachCanvas(canvas);
    entityManager.addEntity(testEntity);
    entityManager.addEntity(testEntity2);

    await engine.start(() => {
    });
  } catch (error) {
    engineStarted = false;
    console.error("Error starting engine:", error);
  }
};

interface AssignmentData{
  assignment: string;
  dueDate: string;
 questions: Array<{
    question: string;
    type: "number" | "dropdown" | "checkbox" | "url" | "text" | "multiple-choice" | "radio" | "date" | "file";
    required?: boolean;
    options?: Array<{ label: string; value: string }>;
  }>;
}

const sampleAssignmentData: AssignmentData = {
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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <StudentApp
      assignment={sampleAssignmentData.assignment}
      dueDate={sampleAssignmentData.dueDate}
      canvasRef={(element) => {
        void startEngine(element!);
      }}
      questions={sampleAssignmentData.questions}
    />
  </StrictMode>,
);
