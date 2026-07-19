import {
    BOARD_SIZE,
    Board,
    TileContent
} from "./board";

import type { Direction } from "./board";
import type { Hero } from "./hero";

import { EnemyType } from "./enemy";

export class Puzzle {

    static calculate(board: Board, hero: Hero): void {

        this.calculateTreasureDirections(board);
        this.calculateTrapHints(board);
        this.calculateCombatHints(board, hero);

    }

    private static calculateTrapHints(board: Board): void {

        for (let y = 0; y < BOARD_SIZE; y++) {

            for (let x = 0; x < BOARD_SIZE; x++) {

                let traps = 0;

                for (let dy = -1; dy <= 1; dy++) {

                    for (let dx = -1; dx <= 1; dx++) {

                        if (dx === 0 && dy === 0)
                            continue;

                        const nx = x + dx;
                        const ny = y + dy;

                        if (
                            nx < 0 ||
                            ny < 0 ||
                            nx >= BOARD_SIZE ||
                            ny >= BOARD_SIZE
                        )
                            continue;

                        if (
                            board.getTile(nx, ny).content === TileContent.Trap
                        )
                            traps++;

                    }

                }

                board.getTile(x, y).trapHint = traps;

            }

        }

    }

    private static calculateCombatHints(
        board: Board,
        hero: Hero
    ): void {

        for (let y = 0; y < BOARD_SIZE; y++) {

            for (let x = 0; x < BOARD_SIZE; x++) {

                let damage = 0;

                for (let dy = -1; dy <= 1; dy++) {

                    for (let dx = -1; dx <= 1; dx++) {

                        if (dx === 0 && dy === 0)
                            continue;

                        const nx = x + dx;
                        const ny = y + dy;

                        if (
                            nx < 0 ||
                            ny < 0 ||
                            nx >= BOARD_SIZE ||
                            ny >= BOARD_SIZE
                        )
                            continue;

                        const content =
                            board.getTile(nx, ny).content;

                        switch (content) {

                            case TileContent.Goblin:
                                damage += hero.damage[EnemyType.Goblin];
                                break;

                            case TileContent.Skeleton:
                                damage += hero.damage[EnemyType.Skeleton];
                                break;

                            case TileContent.Orc:
                                damage += hero.damage[EnemyType.Orc];
                                break;

                            case TileContent.Spider:
                                damage += hero.damage[EnemyType.Spider];
                                break;

                            case TileContent.Dragon:
                                damage += hero.damage[EnemyType.Dragon];
                                break;

                        }

                    }

                }

                board.getTile(x, y).combatHint = damage;

            }

        }

    }

    private static calculateTreasureDirections(board: Board): void {

        let treasureX = 0;
        let treasureY = 0;

        for (let y = 0; y < BOARD_SIZE; y++) {

            for (let x = 0; x < BOARD_SIZE; x++) {

                if (board.getTile(x, y).content === TileContent.Treasure) {

                    treasureX = x;
                    treasureY = y;

                    break;

                }

            }

        }

        for (let y = 0; y < BOARD_SIZE; y++) {

            for (let x = 0; x < BOARD_SIZE; x++) {

                board.getTile(x, y).treasureDirection =
                    this.directionTo(
                        x,
                        y,
                        treasureX,
                        treasureY
                    );

            }

        }

    }

    private static directionTo(
        fromX: number,
        fromY: number,
        toX: number,
        toY: number
    ): Direction {

        const dx = Math.sign(toX - fromX);
        const dy = Math.sign(toY - fromY);

        if (dx === 0 && dy === 0) return "•";
        if (dx === 0 && dy === -1) return "↑";
        if (dx === 1 && dy === -1) return "↗";
        if (dx === 1 && dy === 0) return "→";
        if (dx === 1 && dy === 1) return "↘";
        if (dx === 0 && dy === 1) return "↓";
        if (dx === -1 && dy === 1) return "↙";
        if (dx === -1 && dy === 0) return "←";

        return "↖";

    }

}
