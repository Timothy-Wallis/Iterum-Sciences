import Engine from "./Engine";
class Canvas {
    private width: number;
    private height: number;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private EngineFunction?: Engine;

    constructor(width: number, height: number) {
        this.height = height;
        this.width = width;
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;

        const tempCtx = this.canvas.getContext('2d');

        if (tempCtx == null) {
            throw new Error("Failure to get 2d context. Canvas rendering is unsupported.");
        }

        this.context = tempCtx;
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