import StudentApp from '../StudentApp.tsx';
import EvolutionSim from '../simulation-evolution-modules/Evolution-Sim.ts'

const evolutionSim = new EvolutionSim();

async function startEngine(element: HTMLCanvasElement) {
  await evolutionSim.startEngine(element);
}

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
function EvolutionSimApp() {
  return (<>
<StudentApp
      assignment={sampleAssignmentData.assignment}
      dueDate={sampleAssignmentData.dueDate}
      canvasRef={(element) => {
        void startEngine(element!);
      }}
      questions={sampleAssignmentData.questions}
    />
    </>);
};

export default EvolutionSimApp;