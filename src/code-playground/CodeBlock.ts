import Entity from "../iframe-game-pkgs/Entity";
import Vec2 from "../iframe-game-pkgs/Vec2";

export class Code{
    interface_ableCode: string;
    executableCode: Function;
    constructor(string_code: string, executable: Function){
        this.interface_ableCode = string_code;
        this.executableCode = executable;
    }
}

export class CodeBlock extends Entity{
    private runCode: Code;

    constructor(x: number, y: number, height: number, code: Code, bitmap: ImageBitmap){
        super(x, y, code.interface_ableCode.length * 150, height, bitmap);
        this.runCode = code;
    }

    move(vector: Vec2<number>){
        this.x += vector.x;
        this.y -= vector.y;
    }

    execute(){
        this.runCode.executableCode();
    }
}