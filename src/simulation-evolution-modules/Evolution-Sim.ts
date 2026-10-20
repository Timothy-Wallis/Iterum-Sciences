import { CTXEngine } from '../iframe-game-pkgs/include.ts'
import type Vec2 from '../iframe-game-pkgs/Vec2.ts';
import type Canvas from '../iframe-game-pkgs/Canvas.ts';
import brownMothTextureUrl from '../assets/GameAssets1-Test/brown-moth.png'
import whiteMothTextureUrl from '../assets/GameAssets1-Test/white-moth.png'
import Bug from './Bug.ts'
import type TextureManager from '../iframe-game-pkgs/TextureManager.ts';

class EvolutionSim {
    private engineStarted: boolean = false;
    private canvas: Canvas;
    private textureManager: TextureManager;

    constructor() {
        this.canvas = new CTXEngine.Canvas(800, 600, document.createElement('canvas'));
        this.textureManager = new CTXEngine.TextureManager();
    }

    private async spriteLoader() {
        try {
            await this.textureManager.load('brown_bug', brownMothTextureUrl);
            await this.textureManager.load('white_bug', whiteMothTextureUrl);
        } catch (error) {
            console.error('Failed to load assignment sprite.', error);
        }
    }

    private getRandomVec2(): Vec2<number> {
        return new CTXEngine.Vec2<number>(
            Math.random() * this.canvas.getWidth(),
            Math.random() * this.canvas.getHeight()
        );
    }

    public async startEngine(element: HTMLCanvasElement) {
        if (this.engineStarted) {
            return;
        }
        this.engineStarted = true;

        try {
            const engine = new CTXEngine.Engine(60);
            this.canvas = new CTXEngine.Canvas(800, 600, element);
            const entityManager = new CTXEngine.EntityManager();
            const camera = new CTXEngine.Camera({ x: 0, y: 0 }, { x: 800, y: 600 }, 1);
            await this.spriteLoader();

            engine.attachCamera(camera);
            engine.attachEntityManager(entityManager);
            engine.attachCanvas(this.canvas);

            for (let i = 0; i < 10; i++) {
                const vec2 = this.getRandomVec2();
                const bug = new Bug(vec2.x, vec2.y, 50, 50, this.textureManager.get('brown_bug'), 50);
                entityManager.addEntity(bug);
            }

            await engine.start(() => {
                for (let i = 0; i < entityManager.getEntityList().length; i++) {
                    const entity = entityManager.getEntity(i);
                    if (entity instanceof Bug) {
                        entity.updatePercent(0.1);
                        if (!entity.run()) {
                            entityManager.getEntityList().splice(i, 1);
                            i--;
                        }
                    }
                }
            });
        } catch (error) {
            this.engineStarted = false;
            console.error("Error starting engine:", error);
        }
    }
}

export default EvolutionSim;