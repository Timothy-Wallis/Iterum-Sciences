class TextureManager {
    // 1. Change cache from static to a standard instance property
    private cache = new Map<string, ImageBitmap>();

    // 2. Remove 'static' keyword to allow instance calls: manager.load(...)
    public async load(key: string, url: string): Promise<ImageBitmap> {
        if (this.cache.has(key)) {
            return this.cache.get(key)!;
        }

        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const bitmap = await createImageBitmap(blob);

            this.cache.set(key, bitmap);
            return bitmap;
        } catch (error) {
            console.error("Failed to load texture: " + url, error);
            throw error;
        }
    }

    public async createFromCanvas(key: string, canvas: HTMLCanvasElement): Promise<ImageBitmap> {
        const bitmap = await createImageBitmap(canvas);
        this.cache.set(key, bitmap);
        return bitmap;
    }

    public get(key: string): ImageBitmap {
        const texture = this.cache.get(key);
        if (!texture) {
            throw new Error("Failure to get ImageBitmap at key: " + key);
        }
        return texture;
    }

    public clear(): void {
        for (const bitmap of this.cache.values()) {
            bitmap.close();
        }
        this.cache.clear(); // Empty the map safely
    }
}

export default TextureManager;
