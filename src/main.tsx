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
    const engine = new CTXEngine.Engine(15);
    const canvas = new CTXEngine.Canvas(800, 600, element);
    const entityManager = new CTXEngine.EntityManager();
    const camera = new CTXEngine.Camera({ x: 0, y: 0 }, { x: 800, y: 600 }, 1);
    await spriteLoader();

    engine.attachCamera(camera);
    engine.attachEntityManager(entityManager);
    engine.attachCanvas(canvas);
    let testUnitVec2 = new CTXEngine.UnitVec2((Math.random() - .5) * 100, (Math.random() - .5) * 100);
    for (let i = 0; i < 50; i++) {
      const testEntity = new CTXEngine.Entity(Math.random() * 800, Math.random() * 600, 80, 80, textureManager.get("brown_bug"));
      entityManager.addEntity(testEntity);
    }
    for(let i = 0; i < 50; i++) {
      const testEntity = new CTXEngine.Entity(Math.random() * 800, Math.random() * 600, 80, 80, textureManager.get("white_bug"));
      entityManager.addEntity(testEntity);
    }
    engine.setClearColor('brown');

    await engine.start(() => {
      // Happens exactly every 10 seconds
      for (const testEntity of entityManager.getEntityList()) {
          testUnitVec2 = new CTXEngine.UnitVec2((Math.random() - .5) * 100, (Math.random() - .5) * 100);
              testEntity.rotate(Math.tan(testUnitVec2.y / testUnitVec2.x) * 180 / Math.PI);
        testEntity.move({ x: testUnitVec2.x * 20, y: testUnitVec2.y * 20 });
        if (testEntity.getX() < 0 || testEntity.getX() > 800 - testEntity.getWidth()) {
          testUnitVec2.x = -testUnitVec2.x;
        }
        if (testEntity.getY() < 0 || testEntity.getY() > 600 - testEntity.getHeight()) {
          testUnitVec2.y = -testUnitVec2.y;
        }
      }
    });
  } catch (error) {
    engineStarted = false;
    console.error("Error starting engine:", error);
  }
};

interface AssignmentData {
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
        { label: "This is due to the white moth being adapted to the environment, whereas the brown moth is adapted for a different environment.", value: "correct" },
        { label: "This is not true, both have the same likelyhood of surviving in this white environment.", value: "false" },
        { label: "The white moth will survive out of luck for being white, no other reason.", value: "false" },
        { label: "The brown moth will survive longer, as it stands out in the environment, acting as camofloage.", value: "false" }
      ]
    }
  ]
};



const root = document.getElementById('root');

if (root) {
  // Development server + website server
  createRoot(root).render(<StrictMode>
    <Analytics />
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
