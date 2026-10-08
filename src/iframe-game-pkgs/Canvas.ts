import Engine from "./Engine";
class Canvas {
    private width: number;
    private height: number;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private EngineFunction?: Engine;
    private id: string;

    constructor(width: number, height: number, canvas?: HTMLCanvasElement) {
        this.height = height;
        this.width = width;
        this.id = crypto.randomUUID();
        this.canvas = canvas ?? document.createElement('canvas');
        if (!this.canvas.id) {
            this.canvas.id = "engine-canvas-" + this.id;
        }
        this.canvas.width = width;
        this.canvas.height = height;
        const context = this.canvas.getContext('2d');
        this.context = context as CanvasRenderingContext2D;
    }

    getWidth(): number {
        return this.width;
    }

    getHeight(): number {
        return this.height;
    }

    getCanvas(): HTMLCanvasElement{
        return this.canvas;
    }

    getContext(): CanvasRenderingContext2D{
        return this.context;
    }

    attachEngine(Engine: Engine){
        this.EngineFunction = Engine;
    }
}

export default Canvas;