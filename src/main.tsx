import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import '../styles.css'
import '../loadingStyle.css'
import StudentApp from './StudentApp.tsx'
import { CTXEngine } from './iframe-game-pkgs/include.ts'
import brownMothTextureUrl from './assets/GameAssets1-Test/brown-moth.png'
import whiteMothTextureUrl from './assets/GameAssets1-Test/white-moth.png'
import Bug from './simulation-evolution-modules/Bug.ts'

let engineStarted = false;
let canvas = new CTXEngine.Canvas(800, 600, document.createElement('canvas'));
const textureManager = new CTXEngine.TextureManager();
const spriteLoader = async () => {
  try {
    await textureManager.load('brown_bug', brownMothTextureUrl);
    await textureManager.load('white_bug', whiteMothTextureUrl);
  } catch (error) {
    console.error('Failed to load assignment sprite.', error);
  }
}
const getRandomVec2 = () => {
  let randomVector = new CTXEngine.Vec2<number>((Math.random()) * canvas.getWidth(), (Math.random()) * canvas.getHeight());
  return randomVector;
}

const startEngine = async (element: HTMLCanvasElement) => {
  if (engineStarted) {
    return;
  }
  engineStarted = true;

  try {
    const engine = new CTXEngine.Engine(60);
    canvas = new CTXEngine.Canvas(800, 600, element);
    const entityManager = new CTXEngine.EntityManager();
    const camera = new CTXEngine.Camera({ x: 0, y: 0 }, { x: 800, y: 600 }, 1);
    await spriteLoader();

    engine.attachCamera(camera);
    engine.attachEntityManager(entityManager);
    engine.attachCanvas(canvas);

    for(let i = 0; i < 10; i++){
      let vec2 = getRandomVec2();
      let bug = new Bug(vec2.x, vec2.y, 50, 50, textureManager.get('brown_bug'), 50);
      entityManager.addEntity(bug);
    }

    await engine.start(() => {
      for(let i = 0; i < entityManager.getEntityList().length; i++){
        let entity = entityManager.getEntity(i);
        if(entity instanceof Bug){
          entity.updatePercent(0.1);
          if(!entity.run()){
            entityManager.getEntityList().splice(i, 1);
            i--;
          }
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
