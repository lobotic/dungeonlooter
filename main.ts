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

    <p><strong>🏰 Goal</strong></p>
    <p>Reach the 🚪 exit before your hero dies.</p>

    <hr>

    <p><strong>🔮 Clues</strong></p>

    <p>🪤 The number shows how many traps are hidden in the 8 surrounding tiles.</p>

    <p>⚔️ The combat value shows the total damage from all monsters in the 8 surrounding tiles.</p>

    <p>🧭 The arrow always points towards the treasure.</p>

    <hr>

    <p><strong>👹 Monsters</strong></p>

    <p>👺 Goblin</p>
    <p>💀 Skeleton</p>
    <p>🐗 Orc</p>
    <p>🕷️ Spider</p>

    <p>Each hero takes different damage from each monster.</p>

    <p>🐉 Dragons deal heavy damage, give 5 gold and always drop 1 scroll.</p>

    <hr>

    <p><strong>💰 Rewards</strong></p>

    <p>💰 Treasure gives 15 gold.</p>

    <p>👹 Monsters may drop gold or scrolls.</p>

    <hr>

    <p><strong>📜 Scrolls</strong></p>

    <p>Reveal any unrevealed tile without moving there.</p>

    <hr>

    <p><strong>☠️ Marks</strong></p>

    <p>Use marks to flag dangerous tiles.</p>

    <p>Marks disappear automatically when you enter a tile.</p>

    <hr>

    <p><strong>🗓️ Daily Challenge</strong></p>

    <p>There is only one dungeon each day.</p>

    <p>Everyone faces the same daily dungeon with the hero they choose.</p>

    <p>Build your win streak and share your results!</p>

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
