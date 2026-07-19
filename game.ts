import { BOARD_SIZE, Board, TileContent } from "./board";
import { HeroType, createHero } from "./hero";
import type { Hero } from "./hero";
import { EnemyType } from "./enemy";
import { Random } from "./random";
import { Puzzle } from "./puzzle";
import {
    loadDaily,
    saveDaily,
    loadStats,
    saveStats,
    saveGame,
    loadGame,
    clearGame
} from "./storage";

export enum GameMode {
    Explore,
    Mark,
    Scroll
}

export class Game {

    readonly board: Board;
    readonly rng: Random;

    mode: GameMode;

    hero: Hero;

    heroX: number;
    heroY: number;

    gold: number;
    scrolls: number;

    gameOver: boolean;
    victory: boolean;
    
    enemiesKilled: number;
alreadyPlayed: boolean;

    constructor(heroType: HeroType) {

        const today = new Date();

        const seed =
          today.getFullYear() * 10000 +
         (today.getMonth() + 1) * 100 +
           today.getDate();

        this.mode = GameMode.Explore;

        this.rng = new Random(seed);

        this.board = new Board();

        this.hero = createHero(heroType);

        this.heroX = 0;
        this.heroY = 0;

        this.gold = 0;
        this.scrolls = 0;

        this.gameOver = false;
        this.victory = false;
        
        this.enemiesKilled = 0;
this.alreadyPlayed = false;

const daily = loadDaily();

if (daily[this.getTodayKey()]) {
    this.alreadyPlayed = true;
}

const saved = loadGame();

if (saved) {
this.board.tiles = saved.board;
   this.heroX = saved.heroX;
this.heroY = saved.heroY;

this.hero.health = saved.health;

this.gold = saved.gold;
this.scrolls = saved.scrolls;

this.enemiesKilled = saved.enemiesKilled;

this.mode = saved.mode;

} else {

    this.generateDungeon();

    Puzzle.calculate(this.board, this.hero);

}
    }

    private generateDungeon(): void {

        this.placeRandom(TileContent.Treasure);

        this.placeRandom(TileContent.Dragon);

        this.placeRandom(TileContent.Goblin);
        this.placeRandom(TileContent.Skeleton);
        this.placeRandom(TileContent.Orc);
        this.placeRandom(TileContent.Spider);

        const traps = 6 + this.rng.nextInt(5);

for (let i = 0; i < traps; i++) {
    this.placeRandom(TileContent.Trap);
}

    }

    private placeRandom(content: TileContent): void {

        while (true) {

            const x = this.rng.nextInt(BOARD_SIZE);
            const y = this.rng.nextInt(BOARD_SIZE);

            const tile = this.board.getTile(x, y);

            if (tile.isStart || tile.isExit)
                continue;

            if (tile.content !== TileContent.Empty)
                continue;

            tile.content = content;
            return;

        }

    }

getTodayKey(): string {

    const today = new Date();

    return String(
        today.getFullYear() * 10000 +
        (today.getMonth() + 1) * 100 +
        today.getDate()
    );

}

saveResult(): void {

    const daily = loadDaily();

    daily[this.getTodayKey()] = {

        played: true,
        hero: this.hero.name,
        victory: this.victory,
        health: this.hero.health,
        gold: this.gold,
        scrolls: this.scrolls,
        enemies: this.enemiesKilled

    };

    saveDaily(daily);

    const stats = loadStats();

    stats.games++;

    if (this.victory) {

        stats.wins++;
        stats.winStreak++;

        if (stats.winStreak > stats.bestWinStreak)
            stats.bestWinStreak = stats.winStreak;

    } else {

        stats.losses++;
        stats.winStreak = 0;

    }

    stats.totalGold += this.gold;
    stats.totalEnemies += this.enemiesKilled;

    if (this.gold > stats.bestGold)
        stats.bestGold = this.gold;

    saveStats(stats);
    clearGame();
}

    private rewardEnemy(): void {

        if (this.rng.nextInt(10) < 7)
            this.gold++;
        else
            this.scrolls++;

    }
// guardar casillas anti f5
private saveGame(): void {

    saveGame({

        heroX: this.heroX,
        heroY: this.heroY,

        health: this.hero.health,

        gold: this.gold,
        scrolls: this.scrolls,

        enemiesKilled: this.enemiesKilled,

        mode: this.mode,
        
        board: this.board.tiles

    });

}    
  //Copiar resultados
  
  copyResults(): void {


const daily = loadDaily();
const result = daily[this.getTodayKey()];
    const stats = loadStats();

    const text =
`🏰 Dungeon Looter ${this.getTodayKey()}

${result.victory ? "🏆 Victory" : "☠️ Defeat"}

🪙 Gold: ${result.gold}
👹 Monsters: ${result.enemies}
❤️ Health: ${result.health}/${this.hero.maxHealth}
📜 Scrolls: ${result.scrolls}

🔥 Win streak: ${stats.winStreak}
🏆 Total wins: ${stats.wins}
https://lobotic.github.io/dungeonlooter/`;



    navigator.clipboard.writeText(text);

}

    private resolveTile(): void {

        const tile = this.board.getTile(this.heroX, this.heroY);

        if (tile.resolved)
            return;

        switch (tile.content) {

            case TileContent.Empty:
                break;

            case TileContent.Trap:
                this.hero.health -= 2;
                break;

            case TileContent.Treasure:
                this.gold += 15;
                break;

            case TileContent.Dragon:
                this.hero.health -= this.hero.damage[EnemyType.Dragon];
                this.gold += 5;
                this.scrolls++;
                 this.enemiesKilled++;
                break;

            case TileContent.Goblin:
                this.hero.health -= this.hero.damage[EnemyType.Goblin];
                this.rewardEnemy();
                 this.enemiesKilled++;
                break;

            case TileContent.Skeleton:
                this.hero.health -= this.hero.damage[EnemyType.Skeleton];
                this.rewardEnemy();
                 this.enemiesKilled++;
                break;

            case TileContent.Orc:
                this.hero.health -= this.hero.damage[EnemyType.Orc];
                this.rewardEnemy();
                 this.enemiesKilled++;
                break;

            case TileContent.Spider:
                this.hero.health -= this.hero.damage[EnemyType.Spider];
                this.rewardEnemy();
                 this.enemiesKilled++;
                break;

        }

        tile.resolved = true;

        if (this.hero.health <= 0) {

            this.hero.health = 0;
            this.gameOver = true;
            this.saveResult();

        }

    }

    toggleMark(x: number, y: number): void {

        if (!this.board.isInside(x, y))
            return;

        const tile = this.board.getTile(x, y);

        if (tile.revealed)
            return;

        tile.marked = !tile.marked;

    }

    moveTo(x: number, y: number): boolean {

        if (this.mode === GameMode.Mark) {

            this.toggleMark(x, y);

            this.mode = GameMode.Explore;

            this.saveGame();

            return true;

        }
        
        if (this.mode === GameMode.Scroll) {

    if (this.scrolls === 0)
        return false;

    if (!this.board.isInside(x, y))
        return false;

    const tile = this.board.getTile(x, y);

    tile.revealed = true;

    this.scrolls--;

    this.mode = GameMode.Explore;

    this.saveGame();

    return true;

}

        if (this.gameOver)
            return false;

        if (!this.board.isInside(x, y))
            return false;

        const dx = Math.abs(x - this.heroX);
        const dy = Math.abs(y - this.heroY);

        if (dx + dy !== 1)
            return false;

        this.heroX = x;
        this.heroY = y;

        const tile = this.board.getTile(x, y);

        // Al entrar en una casilla desaparece la marca.
        tile.marked = false;

        this.board.reveal(x, y);

        this.resolveTile();

    if (tile.isExit && this.hero.health > 0) {

    this.victory = true;
    this.gameOver = true;

    this.saveResult();

} else {

    this.saveGame();

}

return true;

    }

}
