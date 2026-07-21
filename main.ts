import { HeroType } from "./hero";
import { Game } from "./game";
import { render } from "./ui";

function startGame(hero: HeroType): void {

    const game = new Game(hero);

    render(game);

}

function showHeroSelection(): void {

    const app = document.getElementById("app");

    if (!app)
        return;

    app.innerHTML = `
       

        <h2>Today's hero</h2>

        <button id="warrior">🛡️ Warrior</button>
        <button id="archer">🏹 Archer</button>
        <button id="mage">🪄 Mage</button>
        
            
    
    <hr>

    <h2>How to Play</h2>




<div class="rules">

    <p>🏰 Reach the 🚪 exit alive.</p>
    <p>🔮 Every move reveals clues.</p>
    <p>👺💀🐗🕷️ Monsters damage your hero.</p>
    <p>🪤 Traps always deal 2 damage.</p>
    <p>💰 Treasure gives 15 gold.</p>
    <p>🐉 Dragon gives gold and a scroll.</p>
    <p>📜 Scrolls reveal any tile.</p>
    <p>☠️ Marks flag suspicious tiles.</p>
    <p>🗓️ One dungeon per day.</p>

</div>

</div>
    `;

    document.getElementById("warrior")!
        .addEventListener("click", () => startGame(HeroType.Warrior));

    document.getElementById("archer")!
        .addEventListener("click", () => startGame(HeroType.Archer));

    document.getElementById("mage")!
        .addEventListener("click", () => startGame(HeroType.Mage));

}

showHeroSelection();
