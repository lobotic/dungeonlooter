import { BOARD_SIZE, TileContent } from "./board";
import { Game, GameMode } from "./game";
import { loadDaily } from "./storage";

function getTileIcon(content: TileContent): string {

    switch (content) {

        case TileContent.Empty:
            return "";

        case TileContent.Goblin:
            return "👺";

        case TileContent.Skeleton:
            return "💀";

        case TileContent.Orc:
            return "🐗";

        case TileContent.Spider:
            return "🕷️";

        case TileContent.Dragon:
            return "🐉";

        case TileContent.Trap:
            return "🪤";

        case TileContent.Treasure:
            return "💰";

    }

}


function showDailyResult(app: HTMLElement, game: Game): void {

    const daily = loadDaily();
    const result = daily[game.getTodayKey()];

    if (!result)
        return;

    const now = new Date();

    const tomorrow = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1
    );

    const remaining = tomorrow.getTime() - now.getTime();

    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    app.innerHTML = `
        <h2>${result.victory ? "🏆 Victory" : "☠️ Defeat"}</h2>

        <p>❤️ ${result.health}</p>
        <p>🪙 ${result.gold}</p>
        <p>👹 ${result.enemies}</p>
        <p>📜 ${result.scrolls}</p>

        <button id="share">
            📋 Copy Results
        </button>

        <div class="daily-lock">
            <h3>⏳ Next dungeon in</h3>
            <h1>
                ${hours.toString().padStart(2, "0")}:
                ${minutes.toString().padStart(2, "0")}:
                ${seconds.toString().padStart(2, "0")}
            </h1>
        </div>
    `;

    document.getElementById("share")?.addEventListener("click", () => {
        game.copyResults();
    });

    setTimeout(() => render(game), 1000);

}

//Render
export function render(game: Game): void {

    const app = document.getElementById("app");

    if (!app)
        return;
        
    if (game.alreadyPlayed) {

    showDailyResult(app, game);

    return;

}   

let html = "";




const current = game.board.getTile(game.heroX, game.heroY);


    
//Panel del jugador
    html += `
        <div class="top-panel">

            <div class="player-panel">

                <h2>${game.hero.icon} ${game.hero.name}</h2>

<p>❤️ ${game.hero.health}/${game.hero.maxHealth}</p>
<p>🪙 ${game.gold}</p>
<p>📜 ${game.scrolls}</p>

            </div>

            <div class="clue-panel">

                <h2>🔮 Clues</h2>

                <p>⚔️ ${current.combatHint}</p>
                <p>🪤 ${current.trapHint}</p>
                <p>🧭 ${current.treasureDirection}</p>

            </div>

            <div class="action-panel">

                <h2>⚔️ Actions</h2>

                <button
                    id="explore"
                    class="${game.mode === GameMode.Explore ? "active" : ""}">
                    Explore
                </button>

                <button
                    id="mark"
                    class="${game.mode === GameMode.Mark ? "active" : ""}">
                    Mark
                </button>

                <button
                    id="scroll"
                    class="${game.mode === GameMode.Scroll ? "active" : ""}"
                    ${game.scrolls === 0 ? "disabled" : ""}>
                    Scroll
                </button>

            </div>

        </div>
    `;

    if (game.gameOver) {

        if (game.victory)
            html += `<h2 class="victory">🏆 Victory!</h2>`;
        else
            html += `<h2 class="gameover">☠️ Game Over</h2>`;

        html += `
            <p>
                <button id="share">
                    📋 Copy Results
                </button>
            </p>
        `;

        if (game.alreadyPlayed) {

            const now = new Date();

            const tomorrow = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() + 1
            );

            const remaining = tomorrow.getTime() - now.getTime();

            const hours = Math.floor(remaining / 3600000);
            const minutes = Math.floor((remaining % 3600000) / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);

            html += `
                <div class="daily-lock">

                    <h3>⏳ Next dungeon in</h3>

                    <h1>
                        ${hours.toString().padStart(2, "0")}:
                        ${minutes.toString().padStart(2, "0")}:
                        ${seconds.toString().padStart(2, "0")}
                    </h1>

                </div>
            `;

        }

    }

    html += `<table class="board">`;

    for (let y = 0; y < BOARD_SIZE; y++) {

        html += "<tr>";

        for (let x = 0; x < BOARD_SIZE; x++) {

            const tile = game.board.getTile(x, y);

            let icon = "⬜";

            if (tile.isStart) {

                icon = "🟢";

            } else if (tile.isExit) {

                icon = "🚪";

            } else if (tile.marked) {

                icon = "☠️";

            } else if (tile.revealed) {

                icon = getTileIcon(tile.content);

            }

            html += `
                <td
                    class="${game.heroX === x && game.heroY === y ? "current" : ""}"
                    data-x="${x}"
                    data-y="${y}">
                    <div class="cell">
                        <div class="icon">${icon}</div>
                    </div>
                </td>
            `;

        }

        html += "</tr>";

    }

    html += "</table>";

    app.innerHTML = html;

    document.getElementById("share")?.addEventListener("click", () => {

        game.copyResults();

    });

    document.getElementById("explore")?.addEventListener("click", () => {

        game.mode = GameMode.Explore;
        render(game);

    });

    document.getElementById("mark")?.addEventListener("click", () => {

        game.mode = GameMode.Mark;
        render(game);

    });

    document.getElementById("scroll")?.addEventListener("click", () => {

        if (game.scrolls === 0)
            return;

        game.mode = GameMode.Scroll;
        render(game);

    });

    const cells = app.querySelectorAll<HTMLTableCellElement>("td");

    cells.forEach(cell => {

        cell.addEventListener("click", () => {

            const x = Number(cell.dataset.x);
            const y = Number(cell.dataset.y);

            if (game.moveTo(x, y))
                render(game);

        });

    });

    if (game.gameOver && game.alreadyPlayed) {

    setTimeout(() => render(game), 1000);

}
}
