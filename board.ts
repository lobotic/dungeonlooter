// board.ts

export const BOARD_SIZE = 6;

export interface Position {
    x: number;
    y: number;
}

export type Direction =
    | "↑"
    | "↓"
    | "←"
    | "→"
    | "↖"
    | "↗"
    | "↙"
    | "↘"
    | "•";

export enum TileContent {
    Empty = "empty",

    Goblin = "goblin",
    Skeleton = "skeleton",
    Orc = "orc",
    Spider = "spider",
    Dragon = "dragon",

    Trap = "trap",
    Treasure = "treasure"
}

export interface Tile {

    position: Position;

    revealed: boolean;

    // Indica si la casilla ya ha aplicado su efecto.
    resolved: boolean;

    isStart: boolean;
    isExit: boolean;

    content: TileContent;

    // Pistas
    combatHint: number;
    trapHint: number;
    treasureDirection: Direction;


    marked: boolean;
}

export class Board {

    tiles: Tile[][] = [];

    constructor() {

        for (let y = 0; y < BOARD_SIZE; y++) {

            const row: Tile[] = [];

            for (let x = 0; x < BOARD_SIZE; x++) {

                row.push({

                    position: { x, y },

                    revealed: false,
                    resolved: false,
                    marked: false,
                    isStart: x === 0 && y === 0,
                    isExit: x === BOARD_SIZE - 1 && y === BOARD_SIZE - 1,

                    content: TileContent.Empty,

                    combatHint: 0,
                    trapHint: 0,
                    treasureDirection: "•"

                });

            }

            this.tiles.push(row);

        }

        // La casilla inicial siempre está revelada.
        this.tiles[0][0].revealed = true;
        this.tiles[0][0].resolved = true;

    }

    getTile(x: number, y: number): Tile {
        return this.tiles[y][x];
    }

    reveal(x: number, y: number): void {
        this.tiles[y][x].revealed = true;
    }

    isInside(x: number, y: number): boolean {

        return (
            x >= 0 &&
            x < BOARD_SIZE &&
            y >= 0 &&
            y < BOARD_SIZE
        );

    }

}
