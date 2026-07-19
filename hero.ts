// hero.ts

import { EnemyType } from "./enemy";

export enum HeroType {
    Warrior = "warrior",
    Archer = "archer",
    Mage = "mage"
}

export interface Hero {
    type: HeroType;
    name: string;
    icon: string;

    maxHealth: number;
    health: number;

    damage: Record<EnemyType, number>;
}

export const HEROES: Record<HeroType, Hero> = {

    [HeroType.Warrior]: {
        type: HeroType.Warrior,
        name: "Warrior",
        icon: "🛡️",

        maxHealth: 10,
        health: 10,

        damage: {
            [EnemyType.Goblin]: 1,
            [EnemyType.Skeleton]: 2,
            [EnemyType.Orc]: 3,
            [EnemyType.Spider]: 1,
            [EnemyType.Dragon]: 5
        }
    },

    [HeroType.Archer]: {
        type: HeroType.Archer,
        name: "Archer",
        icon: "🏹",

        maxHealth: 10,
        health: 10,

        damage: {
            [EnemyType.Goblin]: 2,
            [EnemyType.Skeleton]: 1,
            [EnemyType.Orc]: 2,
            [EnemyType.Spider]: 3,
            [EnemyType.Dragon]: 5
        }
    },

    [HeroType.Mage]: {
        type: HeroType.Mage,
        name: "Mage",
        icon: "🧙",

        maxHealth: 10,
        health: 10,

        damage: {
            [EnemyType.Goblin]: 1,
            [EnemyType.Skeleton]: 3,
            [EnemyType.Orc]: 1,
            [EnemyType.Spider]: 2,
            [EnemyType.Dragon]: 5
        }
    }

};

/**
 * Crea una copia del héroe seleccionado para la partida.
 */
export function createHero(type: HeroType): Hero {
    return structuredClone(HEROES[type]);
}

/**
 * Devuelve el daño que recibe un héroe frente a un enemigo.
 */
export function getHeroDamage(hero: Hero, enemy: EnemyType): number {
    return hero.damage[enemy];
}
