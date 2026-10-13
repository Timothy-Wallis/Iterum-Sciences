class Vec2<T>{
    public x: T;
    public y: T;

    constructor(x: T, y: T){
        this.x = x;
        this.y = y;
    }
}

class UnitVec2<T> extends Vec2<T>{
    constructor(x: T, y: T){
        super(x, y);
        const magnitude = Math.sqrt(Number(x) * Number(x) + Number(y) * Number(y));
        if(magnitude === 0){
            throw new Error("Cannot create a unit vector from a zero vector.");
        }
        this.x = (Number(x) / magnitude) as unknown as T;
        this.y = (Number(y) / magnitude) as unknown as T;
    }
    public static fromVec2<T>(vec: Vec2<T>): UnitVec2<T>{
        return new UnitVec2<T>(vec.x, vec.y);
    }
}
export default Vec2;
export { UnitVec2 };