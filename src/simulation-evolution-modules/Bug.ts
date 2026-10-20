import Entity from "../iframe-game-pkgs/Entity";
import Lerp from "../iframe-game-pkgs/LinearInterpolation";
import Vec2, { UnitVec2 } from "../iframe-game-pkgs/Vec2";

class Bug extends Entity{
    // private movementPercent: number = 0;
    private lifeSpan: number;
    private lerpVec2: Vec2<Lerp>;
    private VectorToNext: UnitVec2<number>;
    private percent: number = 0;
    constructor(x: number, y: number, width: number, height: number, sprite: ImageBitmap, lifeSpan: number){
        super(x, y, width, height, sprite);
        this.lifeSpan = lifeSpan;
        this.VectorToNext = this.newUnitVec2();
        this.lerpVec2 = new Vec2<Lerp>(new Lerp(this.x, this.VectorToNext.x, this.percent), new Lerp(this.y, this.VectorToNext.y, this.percent));
    }
    public run(): boolean{
        if(this.lifeSpan > 0){
            this.move({x: this.lerpVec2.x.value, y: this.lerpVec2.y.value});
            if(this.percent >= 1.0){
                this.percent = 0;
                this.VectorToNext = this.newUnitVec2();
                this.lerpVec2 = new Vec2<Lerp>(new Lerp(this.x, this.VectorToNext.x, this.percent), new Lerp(this.y, this.VectorToNext.y, this.percent));
            }
            return true;
        }
        return false;
    }
    public updateTime(){
        this.lifeSpan--;
    }
    public updatePercent(percent: number){
        this.percent = percent;
        this.lerpVec2.x.changePercent(this.percent);
        this.lerpVec2.y.changePercent(this.percent);
    }
    private newUnitVec2(){
        return new UnitVec2((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10)
    }
}

export default Bug;