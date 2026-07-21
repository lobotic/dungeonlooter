import type { Tile } from "./board";

export interface DailyResult {

    played: boolean;

    hero: string;

    victory: boolean;

    health: number;

    gold: number;
    scrolls: number;

    enemies: number;

}

export interface Statistics {

    games: number;

    wins: number;
    losses: number;

    totalGold: number;
    totalEnemies: number;

    bestGold: number;

    winStreak: number;
    streakGold: number;
    bestWinStreak: number;
    

}

export interface SavedGame {

    heroX: number;
    heroY: number;

    health: number;

    gold: number;
    scrolls: number;

    enemiesKilled: number;

    mode: number;
    
    board: Tile[][];

}

const DAILY_KEY = "dungeon-looter-daily";
const STATS_KEY = "dungeon-looter-stats";

function todayKey(): string {

    const today = new Date();

    return [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

}

export function loadDaily(): Record<string, DailyResult> {

    return JSON.parse(
        localStorage.getItem(DAILY_KEY) ?? "{}"
    );

}

export function saveDaily(data: Record<string, DailyResult>): void {

    localStorage.setItem(
        DAILY_KEY,
        JSON.stringify(data)
    );

}

export function hasPlayedToday(): boolean {

    const daily = loadDaily();

    return daily[todayKey()] !== undefined;

}

export function saveToday(result: DailyResult): void {

    const daily = loadDaily();

    daily[todayKey()] = result;

    saveDaily(daily);

}

export function loadStats(): Statistics {

    const stats = JSON.parse(

        localStorage.getItem(STATS_KEY) ??

        JSON.stringify({

            games: 0,

            wins: 0,
            losses: 0,

            totalGold: 0,
            totalEnemies: 0,

            bestGold: 0,

            winStreak: 0,
            streakGold: 0,
            bestWinStreak: 0

        })

    );

    if (stats.streakGold == null)
        stats.streakGold = 0;

    return stats;

}

export function saveStats(stats: Statistics): void {

    localStorage.setItem(
        STATS_KEY,
        JSON.stringify(stats)
    );

}

export function registerGame(result: DailyResult): void {

    saveToday(result);

    const stats = loadStats();

    stats.games++;

    stats.totalGold += result.gold;
    stats.totalEnemies += result.enemies;

    if (result.gold > stats.bestGold)
        stats.bestGold = result.gold;

    if (result.victory) {

        stats.wins++;

        stats.winStreak++;

        if (stats.winStreak > stats.bestWinStreak)
            stats.bestWinStreak = stats.winStreak;

    } else {

        stats.losses++;
        stats.winStreak = 0;

    }

    saveStats(stats);

}

export function saveGame(game: SavedGame): void {

    localStorage.setItem(
        "dungeon-looter-game",
        JSON.stringify(game)
    );

}

export function loadGame(): SavedGame | null {

    const data = localStorage.getItem("dungeon-looter-game");

    if (!data)
        return null;

    return JSON.parse(data);

}

export function clearGame(): void {

    localStorage.removeItem("dungeon-looter-game");

}
