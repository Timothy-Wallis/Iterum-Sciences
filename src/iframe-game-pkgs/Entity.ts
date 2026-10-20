import Vec2 from "./Vec2";

class Entity {
    
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    protected sprite: ImageBitmap;
    protected rotation: number


constructor(x: number, y: number, width: number, height: number, sprite: ImageBitmap){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
    this.rotation = 0;
}

move(vector: Vec2<number>){
    this.x += vector.x;
    this.y -= vector.y;
    this.rotation = Math.atan2(-vector.y, vector.x) * (180 / Math.PI) + 90;
}

rotate(Degree: number){
    this.rotation = Degree;
}

getRotation(): number{
    return this.rotation;
}

getSprite(): ImageBitmap{
    return this.sprite;
}

getX(): number{
    return this.x;
}

getY(): number{
    return this.y;
}

getWidth(): number {
    return this.width;
}
getHeight(): number{
    return this.height;
}

setTexture(texture: ImageBitmap): void {
    this.sprite = texture;
}
}

export default Entity;