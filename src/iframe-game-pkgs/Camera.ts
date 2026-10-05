import Vec2 from "./Vec2";

class Camera{
    private origin:Vec2<number>;
    private renderView:Vec2<number>;
    private speed: number;

    constructor(origin: Vec2<number>, renderView: Vec2<number>, speed:number){
        this.origin = origin;
        this.renderView = renderView;
        this.speed = speed;
    }

    getOrigin():Vec2<number>{
        return this.origin;
    }

    getRenderView(): Vec2<number>{
        return this.renderView;
    }

    getSpeed(): number{
        return this.speed;
    }

    setOrigin(newOrigin: Vec2<number>){
        this.origin = newOrigin;
    }
}

export default Camera;