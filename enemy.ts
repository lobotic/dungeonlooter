// enemy.ts

export enum EnemyType {
    Goblin = "goblin",
    Skeleton = "skeleton",
    Orc = "orc",
    Spider = "spider",
    Dragon = "dragon"
}

export interface Enemy {
    type: EnemyType;
    name: string;
    icon: string;
}

export const ENEMIES: Record<EnemyType, Enemy> = {

    [EnemyType.Goblin]: {
        type: EnemyType.Goblin,
        name: "Goblin",
        icon: "👺"
    },

    [EnemyType.Skeleton]: {
        type: EnemyType.Skeleton,
        name: "Esqueleto",
        icon: "💀"
    },

    [EnemyType.Orc]: {
        type: EnemyType.Orc,
        name: "Orco",
        icon: "🐗"
    },

    [EnemyType.Spider]: {
        type: EnemyType.Spider,
        name: "Araña",
        icon: "🕷️"
    },

    [EnemyType.Dragon]: {
        type: EnemyType.Dragon,
        name: "Dragón",
        icon: "🐉"
    }

};
