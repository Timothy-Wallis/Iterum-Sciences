import Entity from "./Entity";
import EntityManager from './EntityManager'
import Camera from "./Camera";
import Canvas from "./Canvas";
//import Vec2 from "./Vec2";

class Engine {
    private frameRate: number;
    private targetFrameRate: number;
    private running: boolean = false;
    private totalTime: number = 0;
    private clearColor: string = 'white';

    private EntityManager: EntityManager | null = null;
    private context: CanvasRenderingContext2D | null = null;
    private canvasWidth: number = 0;
    private canvasHeight: number = 0;
    private camera: Camera | null = null;
    constructor(frameRate: number) {
        this.frameRate = frameRate
        this.targetFrameRate = 1000 / frameRate;
    }

    setFrameRate(frameRate: number) {
        this.frameRate = frameRate;
        this.targetFrameRate = 1000 / frameRate;
    }

    getFrameRate(): number {
        return this.frameRate;
    }

    attachCanvas(canvas: Canvas) {
        this.context = canvas.getCanvas().getContext('2d') as CanvasRenderingContext2D;
        this.canvasWidth = canvas.getWidth();
        this.canvasHeight = canvas.getHeight();
    }

    attachEntityManager(EntityManager: EntityManager) {
        this.EntityManager = EntityManager;
    }

    attachCamera(Camera: Camera) {
        this.camera = Camera;
    }

    getIsRunning(): boolean {
        return this.running;
    }

    setClearColor(Color: string) {
        this.clearColor = Color;
    }

    setClearColorRGB(Red: number, Green: number, Blue: number, Alpha?: number) {
        if (Alpha == null) {
            Alpha = 1;
        }
        this.clearColor = `rgba(${Red}, ${Green}, ${Blue}, ${Alpha})`;
    }

    /**
     * 
     * @returns Total time in seconds per frame
     */
    getTotalTime(): number {
        return Math.floor(this.totalTime / this.frameRate);
    }

    getExactTotalTime(): number {
        return this.totalTime / this.frameRate;
    }

    private wait(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async start(callback: () => void) {
        if (this.context == null) {
            throw new Error("Failure to get correct context, must intialize context to begin.");
        } else if (this.canvasHeight == 0 || this.canvasWidth == 0) {
            throw new Error("Canvas does not exist/or is unabled to be seen. Engine will exit.");
        } else if (this.EntityManager == null) {
            console.warn("No entity manager present, unable to do anything.");
            this.EntityManager = new EntityManager();
        } else if (this.camera == null) {
            console.warn("No camera present - Defaulting to fixed position.");
            this.camera = new Camera({ x: this.canvasWidth / 2, y: this.canvasHeight / 2 }, { x: this.canvasWidth, y: this.canvasHeight }, 1);
        }
        this.running = true;

        while (this.running) {
            const startTime = performance.now();
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            this.context.fillStyle = this.clearColor;
            this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

            callback();

            for (let i = 0; i < this.EntityManager.getEntityList().length; i++) {
                const tempEntity = this.EntityManager.getEntity(i) as Entity;

                this.context.save(); // Save the current canvas state

                // 1. Move origin to the CENTER of the entity
                const centerX = tempEntity.getX() + tempEntity.getWidth() / 2;
                const centerY = tempEntity.getY() + tempEntity.getHeight() / 2;
                this.context.translate(centerX, centerY);

                // 2. Rotate around that center
                this.context.rotate(tempEntity.getRotation() * Math.PI / 180);

                // 3. Draw the image offset by -width/2 and -height/2 so it centers correctly
                this.context.drawImage(
                    tempEntity.getSprite(),
                    -tempEntity.getWidth() / 2,
                    -tempEntity.getHeight() / 2,
                    tempEntity.getWidth(),
                    tempEntity.getHeight()
                );

                this.context.restore(); // Restore the canvas state for the next entity
            }
            const endTime = performance.now();

            const executionTime = endTime - startTime;

            const timeRemaining = this.targetFrameRate - executionTime;
            this.totalTime++;

            if (timeRemaining > 0) {
                await this.wait(timeRemaining);
            } else {
                await this.wait(0);
            }
        }
    }

    stop() {
        this.running = false;
    }
}

export default Engine;