import Entity from "./Entity";
import EntityManager from './EntityManager'
import Camera from "./Camera";
import Canvas from "./Canvas";
import Vec2 from "./Vec2";

class Engine{
    private frameRate: number;
    private targetFrameRate: number;
    private running: boolean = false;

    private EntityManager: EntityManager | null = null;
    private context: CanvasRenderingContext2D | null = null;
    private canvasWidth: number = 0;
    private canvasHeight: number = 0;
    private camera: Camera | null = null;
    constructor(frameRate: number){
        this.frameRate = frameRate
        this.targetFrameRate = 1000 / frameRate;
    }

    setFrameRate(frameRate: number){
        this.frameRate = frameRate;
        this.targetFrameRate = 1000/frameRate;
    }
    
    attachCanvas(canvas: Canvas){
        this.context = canvas.getCanvas().getContext('2d') as CanvasRenderingContext2D;
        this.canvasWidth = canvas.getWidth();
        this.canvasHeight = canvas.getHeight();
    }

    attachEntityManager(EntityManager: EntityManager){
        this.EntityManager = EntityManager;
    }

    attachCamera(Camera: Camera){
        this.camera = Camera;
    }

    getIsRunning(): boolean{
        return this.running;
    }

    private wait(ms: number):Promise<void>{
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async start(callback: () => void){
        if(this.context == null){
            throw new Error("Failure to get correct context, must intialize context to begin.");
        }else if(this.canvasHeight == 0 || this.canvasWidth == 0){
            throw new Error("Canvas does not exist/or is unabled to be seen. Engine will exit.");
        }else if(this.EntityManager == null){
            console.warn("No entity manager present, unable to do anything.");
            this.EntityManager = new EntityManager();
        }else if(this.camera == null){
            console.warn("No camera present - Defaulting to fixed position.");
            this.camera = new Camera({x: this.canvasWidth / 2, y: this.canvasHeight / 2}, {x: this.canvasWidth, y: this.canvasHeight}, 1);
        }
        this.running = true;

        while(this.running){
            const startTime = performance.now();

            // Override for assumption of camera being invalid
            //const Camera = this.camera as Camera;

            //this.context.translate(Camera.getOrigin().x, Camera.getOrigin().y);

            //const newOrigin = new Vec2<number>(Camera.getOrigin().x + Camera.getSpeed(), Camera.getOrigin().y + Camera.getSpeed());

            //this.camera?.setOrigin(newOrigin);
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            this.context.fillStyle = "skyblue";
            this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

            callback();

            for(let i = 0; i < this.EntityManager.getEntityList().length; i++){
                const tempEntity = this.EntityManager.getEntity(i) as Entity;
                this.context.drawImage(tempEntity.getSprite(), tempEntity.getX(), tempEntity.getY(), tempEntity.getWidth(), tempEntity.getHeight());
            }
            const endTime = performance.now();

            const executionTime = endTime - startTime;

            const timeRemaining = this.targetFrameRate - executionTime;

            if(timeRemaining > 0){
                await this.wait(timeRemaining);
            }else{
                await this.wait(0);
            }
        }
    }

    stop(){
        this.running = false;
    }
}

export default Engine;