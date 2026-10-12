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
    const engine = new CTXEngine.Engine(60);
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
      // Happens exactly every 10 seconds
      if(engine.getExactTotalTime() % 10 == 0){
      }
      testEntity.move({x: 1, y: 0})
      testEntity.rotate(1 + testEntity.getRotation());
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
  assignment: "Demo 1 - Evolution simulation",
  dueDate: "October 12, 2026 - 11:59 PM",
  questions: [
    {
      question: "Why is the White moth more likely to survive then the brown moth?",
      type: "multiple-choice",
      required: true,
      options: [
        {label: "This is due to the white moth being adapted to the environment, whereas the brown moth is adapted for a different environment.", value: "correct"},
        {label: "This is not true, both have the same likelyhood of surviving in this white environment.", value: "false"},
        {label: "The white moth will survive out of luck for being white, no other reason.", value: "false"},
        {label: "The brown moth will survive longer, as it stands out in the environment, acting as camofloage.", value: "false"}
      ]
    }
  ]
};



const root = document.getElementById('root');

if(root){
  // Development server + website server
    createRoot(root).render(<StrictMode>
      <Analytics/>
      <StudentApp
      assignment={sampleAssignmentData.assignment}
      dueDate={sampleAssignmentData.dueDate}
      canvasRef={(element) => {
        void startEngine(element!);
      }}
      questions={sampleAssignmentData.questions}
      />
    </StrictMode>
    );
}
