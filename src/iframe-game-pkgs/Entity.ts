import Vec2 from "./Vec2";

class Entity{
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private sprite: ImageBitmap;

    constructor(x: number, y: number, width: number, height: number, sprite: ImageBitmap){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
    }

    move(vector: Vec2<number>){
        this.x += vector.x;
        this.y += vector.y;
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