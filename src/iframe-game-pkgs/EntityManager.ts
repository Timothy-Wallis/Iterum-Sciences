import Entity from "./Entity";
class EntityManager {
    private Entities: Entity[] = [];
    constructor() {}
    public addEntity(entity: Entity): void {
        this.Entities.push(entity);
    }

    public getEntity(index: number) {
        if (index < this.Entities.length && index >= 0) {
            return this.Entities[index];
        }
    }

    public getEntityList(): Entity[]{
        return this.Entities;
    }
}

export default EntityManager;