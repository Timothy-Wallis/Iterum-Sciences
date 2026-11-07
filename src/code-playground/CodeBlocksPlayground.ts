import { Code, CodeBlock } from "./CodeBlock";
import { CTXEngine } from "../iframe-game-pkgs/include";
import TextureManager from '../iframe-game-pkgs/TextureManager';
import Canvas from "../iframe-game-pkgs/Canvas"

const BlockHeight = 20;

export default class CodeBlocksPlayground{
    private textureManager: TextureManager;
    private engineStarted: boolean = false;
    private canvas: Canvas;
    private codeList: Code[];

    constructor(){
        this.canvas = new Canvas(800, 600, document.createElement('canvas'));
        this.textureManager = new TextureManager();
        this.codeList = [new Code('print', () => {console.log('Printing.')})];
    }

    private async spriteLoader(){
        try{
            for(let i: number = 0; i < this.codeList.length; i++){
                const canvas_temp = document.createElement('canvas');
                const ctx = canvas_temp.getContext('2d') as CanvasRenderingContext2D;
                ctx.fillStyle = "green";
                ctx.fillRect(20, 20, this.codeList[i].interface_ableCode.length * 150, BlockHeight * 5);
                ctx.fillText(this.codeList[i].interface_ableCode, this.codeList[i].interface_ableCode.length * 100, BlockHeight * 2);
                ctx.fill();
                await this.textureManager.createFromCanvas(this.codeList[i].interface_ableCode, canvas_temp);
            }
        }catch(err){
            console.error("Failed to intialize sprites",err);
        }
    }

    public async startEngine(element: HTMLCanvasElement){
        if(this.engineStarted){
            return;
        }
        this.engineStarted = true;

        try {
            const engine = new CTXEngine.Engine(144);
            this.canvas = new CTXEngine.Canvas(800, 600, element);
            const entityManager = new CTXEngine.EntityManager();
            const camera = new CTXEngine.Camera({x: 0, y: 0}, {x: 800, y: 800}, 1);
            await this.spriteLoader();

            engine.attachCamera(camera);
            engine.attachEntityManager(entityManager);
            engine.attachCanvas(this.canvas);


            for(let i: number = 0; i < this.codeList.length; i++){
                entityManager.addEntity(new CodeBlock(0, 0, BlockHeight * 5, this.codeList[i], this.textureManager.get(this.codeList[i].interface_ableCode)));
            }

            await engine.start(() => {
            });
        }catch(err){
            console.error("Failure to start engine", err);
        }
    }


}