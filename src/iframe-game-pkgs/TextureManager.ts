class TextureManager{
    private static cache = new Map<string, ImageBitmap>();

    public static async load(key: string, url: string): Promise<ImageBitmap>{
        if(this.cache.has(key)){
            return this.cache.get(key)!;
        }

        try{
            const res = await fetch(url);
            const blob = await res.blob();

            const bitmap = await createImageBitmap(blob);

            this.cache.set(key, bitmap);
            return bitmap;
        }catch(error){
            console.error("Failed to load texture: " + url, error);
            throw error;
        }
    }

    public static async createFromCanvas(key: string, canvas: HTMLCanvasElement): Promise<ImageBitmap>{
        const bitmap = await createImageBitmap(canvas);
        this.cache.set(key, bitmap);
        return bitmap;
    }

    public static get(key: string): ImageBitmap{
        const texture = this.cache.get(key);
        if(!texture){
            throw new Error("Failure to load ImageBitmap at: " + key + "key");
        }
        return texture;
    }

    public static clear(): void{
        for(const bitmap of this.cache.values()){
            bitmap.close();
        }
    }
}

export default TextureManager;