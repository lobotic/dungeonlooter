(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=function(e){return e.Goblin=`goblin`,e.Skeleton=`skeleton`,e.Orc=`orc`,e.Spider=`spider`,e.Dragon=`dragon`,e}({}),t=function(e){return e.Warrior=`warrior`,e.Archer=`archer`,e.Mage=`mage`,e}({}),n={warrior:{type:`warrior`,name:`Warrior`,icon:`🛡️`,maxHealth:10,health:10,damage:{[e.Goblin]:1,[e.Skeleton]:2,[e.Orc]:3,[e.Spider]:1,[e.Dragon]:5}},archer:{type:`archer`,name:`Archer`,icon:`🏹`,maxHealth:10,health:10,damage:{[e.Goblin]:2,[e.Skeleton]:1,[e.Orc]:2,[e.Spider]:3,[e.Dragon]:5}},mage:{type:`mage`,name:`Mage`,icon:`🧙`,maxHealth:10,health:10,damage:{[e.Goblin]:1,[e.Skeleton]:3,[e.Orc]:1,[e.Spider]:2,[e.Dragon]:5}}};function r(e){return structuredClone(n[e])}var i=function(e){return e.Empty=`empty`,e.Goblin=`goblin`,e.Skeleton=`skeleton`,e.Orc=`orc`,e.Spider=`spider`,e.Dragon=`dragon`,e.Trap=`trap`,e.Treasure=`treasure`,e}({}),a=class{tiles=[];constructor(){for(let e=0;e<6;e++){let t=[];for(let n=0;n<6;n++)t.push({position:{x:n,y:e},revealed:!1,resolved:!1,marked:!1,isStart:n===0&&e===0,isExit:n===5&&e===5,content:`empty`,combatHint:0,trapHint:0,treasureDirection:`•`});this.tiles.push(t)}this.tiles[0][0].revealed=!0,this.tiles[0][0].resolved=!0}getTile(e,t){return this.tiles[t][e]}reveal(e,t){this.tiles[t][e].revealed=!0}isInside(e,t){return e>=0&&e<6&&t>=0&&t<6}},o=class{seed;constructor(e){this.seed=e}next(){return this.seed=this.seed*1664525+1013904223>>>0,this.seed}nextFloat(){return this.next()/4294967296}nextInt(e){return Math.floor(this.nextFloat()*e)}},s=class{static calculate(e,t){this.calculateTreasureDirections(e),this.calculateTrapHints(e),this.calculateCombatHints(e,t)}static calculateTrapHints(e){for(let t=0;t<6;t++)for(let n=0;n<6;n++){let r=0;for(let a=-1;a<=1;a++)for(let o=-1;o<=1;o++){if(o===0&&a===0)continue;let s=n+o,c=t+a;s<0||c<0||s>=6||c>=6||e.getTile(s,c).content===i.Trap&&r++}e.getTile(n,t).trapHint=r}}static calculateCombatHints(t,n){for(let r=0;r<6;r++)for(let a=0;a<6;a++){let o=0;for(let s=-1;s<=1;s++)for(let c=-1;c<=1;c++){if(c===0&&s===0)continue;let l=a+c,u=r+s;if(!(l<0||u<0||l>=6||u>=6))switch(t.getTile(l,u).content){case i.Goblin:o+=n.damage[e.Goblin];break;case i.Skeleton:o+=n.damage[e.Skeleton];break;case i.Orc:o+=n.damage[e.Orc];break;case i.Spider:o+=n.damage[e.Spider];break;case i.Dragon:o+=n.damage[e.Dragon];break}}t.getTile(a,r).combatHint=o}}static calculateTreasureDirections(e){let t=0,n=0;for(let r=0;r<6;r++)for(let a=0;a<6;a++)if(e.getTile(a,r).content===i.Treasure){t=a,n=r;break}for(let r=0;r<6;r++)for(let i=0;i<6;i++)e.getTile(i,r).treasureDirection=this.directionTo(i,r,t,n)}static directionTo(e,t,n,r){let i=Math.sign(n-e),a=Math.sign(r-t);return i===0&&a===0?`•`:i===0&&a===-1?`↑`:i===1&&a===-1?`↗`:i===1&&a===0?`→`:i===1&&a===1?`↘`:i===0&&a===1?`↓`:i===-1&&a===1?`↙`:i===-1&&a===0?`←`:`↖`}},c=`dungeon-looter-daily`,l=`dungeon-looter-stats`;function u(){return JSON.parse(localStorage.getItem(c)??`{}`)}function d(e){localStorage.setItem(c,JSON.stringify(e))}function f(){return JSON.parse(localStorage.getItem(l)??JSON.stringify({games:0,wins:0,losses:0,totalGold:0,totalEnemies:0,bestGold:0,winStreak:0,bestWinStreak:0}))}function p(e){localStorage.setItem(l,JSON.stringify(e))}function m(e){localStorage.setItem(`dungeon-looter-game`,JSON.stringify(e))}function h(){let e=localStorage.getItem(`dungeon-looter-game`);return e?JSON.parse(e):null}function g(){localStorage.removeItem(`dungeon-looter-game`)}var _=function(e){return e[e.Explore=0]=`Explore`,e[e.Mark=1]=`Mark`,e[e.Scroll=2]=`Scroll`,e}({}),v=class{board;rng;mode;hero;heroX;heroY;gold;scrolls;gameOver;victory;enemiesKilled;alreadyPlayed;constructor(e){this.mode=0,this.rng=new o(4543),this.board=new a,this.hero=r(e),this.heroX=0,this.heroY=0,this.gold=0,this.scrolls=0,this.gameOver=!1,this.victory=!1,this.enemiesKilled=0,this.alreadyPlayed=!1,u()[this.getTodayKey()]&&(this.alreadyPlayed=!0);let t=h();t?(this.board.tiles=t.board,this.heroX=t.heroX,this.heroY=t.heroY,this.hero.health=t.health,this.gold=t.gold,this.scrolls=t.scrolls,this.enemiesKilled=t.enemiesKilled,this.mode=t.mode):(this.generateDungeon(),s.calculate(this.board,this.hero))}generateDungeon(){this.placeRandom(i.Treasure),this.placeRandom(i.Dragon),this.placeRandom(i.Goblin),this.placeRandom(i.Skeleton),this.placeRandom(i.Orc),this.placeRandom(i.Spider);let e=6+this.rng.nextInt(5);for(let t=0;t<e;t++)this.placeRandom(i.Trap)}placeRandom(e){for(;;){let t=this.rng.nextInt(6),n=this.rng.nextInt(6),r=this.board.getTile(t,n);if(!(r.isStart||r.isExit)&&r.content===i.Empty){r.content=e;return}}}getTodayKey(){let e=new Date;return String(e.getFullYear()*1e4+(e.getMonth()+1)*100+e.getDate())}saveResult(){let e=u();e[this.getTodayKey()]={played:!0,hero:this.hero.name,victory:this.victory,health:this.hero.health,gold:this.gold,scrolls:this.scrolls,enemies:this.enemiesKilled},d(e);let t=f();t.games++,this.victory?(t.wins++,t.winStreak++,t.winStreak>t.bestWinStreak&&(t.bestWinStreak=t.winStreak)):(t.losses++,t.winStreak=0),t.totalGold+=this.gold,t.totalEnemies+=this.enemiesKilled,this.gold>t.bestGold&&(t.bestGold=this.gold),p(t),g()}rewardEnemy(){this.rng.nextInt(10)<7?this.gold++:this.scrolls++}saveGame(){m({heroX:this.heroX,heroY:this.heroY,health:this.hero.health,gold:this.gold,scrolls:this.scrolls,enemiesKilled:this.enemiesKilled,mode:this.mode,board:this.board.tiles})}copyResults(){let e=u()[this.getTodayKey()],t=f(),n=`🏰 Dungeon Looter ${this.getTodayKey()}

${e.victory?`🏆 Victory`:`☠️ Defeat`}

🪙 Gold: ${e.gold}
👹 Monsters: ${e.enemies}
❤️ Health: ${e.health}/${this.hero.maxHealth}
📜 Scrolls: ${e.scrolls}

🔥 Win streak: ${t.winStreak}
🏆 Total wins: ${t.wins}
https://lobotic.github.io/dungeonlooter/`;navigator.clipboard.writeText(n)}resolveTile(){let t=this.board.getTile(this.heroX,this.heroY);if(!t.resolved){switch(t.content){case i.Empty:break;case i.Trap:this.hero.health-=2;break;case i.Treasure:this.gold+=15;break;case i.Dragon:this.hero.health-=this.hero.damage[e.Dragon],this.gold+=5,this.scrolls++,this.enemiesKilled++;break;case i.Goblin:this.hero.health-=this.hero.damage[e.Goblin],this.rewardEnemy(),this.enemiesKilled++;break;case i.Skeleton:this.hero.health-=this.hero.damage[e.Skeleton],this.rewardEnemy(),this.enemiesKilled++;break;case i.Orc:this.hero.health-=this.hero.damage[e.Orc],this.rewardEnemy(),this.enemiesKilled++;break;case i.Spider:this.hero.health-=this.hero.damage[e.Spider],this.rewardEnemy(),this.enemiesKilled++;break}t.resolved=!0,this.hero.health<=0&&(this.hero.health=0,this.gameOver=!0,this.saveResult())}}toggleMark(e,t){if(!this.board.isInside(e,t))return;let n=this.board.getTile(e,t);n.revealed||(n.marked=!n.marked)}moveTo(e,t){if(this.mode===1)return this.toggleMark(e,t),this.mode=0,this.saveGame(),!0;if(this.mode===2){if(this.scrolls===0||!this.board.isInside(e,t))return!1;let n=this.board.getTile(e,t);return n.revealed=!0,this.scrolls--,this.mode=0,this.saveGame(),!0}if(this.gameOver||!this.board.isInside(e,t)||Math.abs(e-this.heroX)+Math.abs(t-this.heroY)!==1)return!1;this.heroX=e,this.heroY=t;let n=this.board.getTile(e,t);return n.marked=!1,this.board.reveal(e,t),this.resolveTile(),n.isExit&&this.hero.health>0?(this.victory=!0,this.gameOver=!0,this.saveResult()):this.saveGame(),!0}};function y(e){switch(e){case i.Empty:return``;case i.Goblin:return`👺`;case i.Skeleton:return`💀`;case i.Orc:return`🐗`;case i.Spider:return`🕷️`;case i.Dragon:return`🐉`;case i.Trap:return`🪤`;case i.Treasure:return`💰`}}function b(e,t){let n=u()[t.getTodayKey()];if(!n)return;let r=new Date,i=new Date(r.getFullYear(),r.getMonth(),r.getDate()+1).getTime()-r.getTime(),a=Math.floor(i/36e5),o=Math.floor(i%36e5/6e4),s=Math.floor(i%6e4/1e3);e.innerHTML=`
        <h2>${n.victory?`🏆 Victory`:`☠️ Defeat`}</h2>

        <p>❤️ ${n.health}</p>
        <p>🪙 ${n.gold}</p>
        <p>👹 ${n.enemies}</p>
        <p>📜 ${n.scrolls}</p>

        <button id="share">
            📋 Copy Results
        </button>

        <div class="daily-lock">
            <h3>⏳ Next dungeon in</h3>
            <h1>
                ${a.toString().padStart(2,`0`)}:
                ${o.toString().padStart(2,`0`)}:
                ${s.toString().padStart(2,`0`)}
            </h1>
        </div>
    `,document.getElementById(`share`)?.addEventListener(`click`,()=>{t.copyResults()}),setTimeout(()=>x(t),1e3)}function x(e){let t=document.getElementById(`app`);if(!t)return;if(e.alreadyPlayed){b(t,e);return}let n=``,r=e.board.getTile(e.heroX,e.heroY);if(n+=`
        <div class="top-panel">

            <div class="player-panel">

                <h2>${e.hero.icon} ${e.hero.name}</h2>

<p>❤️ ${e.hero.health}/${e.hero.maxHealth}</p>
<p>🪙 ${e.gold}</p>
<p>📜 ${e.scrolls}</p>

            </div>

            <div class="clue-panel">

                <h2>🔮 Clues</h2>

                <p>⚔️ ${r.combatHint}</p>
                <p>🪤 ${r.trapHint}</p>
                <p>🧭 ${r.treasureDirection}</p>

            </div>

            <div class="action-panel">

                <h2>⚔️ Actions</h2>

                <button
                    id="explore"
                    class="${e.mode===_.Explore?`active`:``}">
                    🗡️ Explore
                </button>

                <button
                    id="mark"
                    class="${e.mode===_.Mark?`active`:``}">
                    ☠️ Mark
                </button>

                <button
                    id="scroll"
                    class="${e.mode===_.Scroll?`active`:``}"
                    ${e.scrolls===0?`disabled`:``}>
                    📜 Scroll
                </button>

            </div>

        </div>
    `,e.gameOver&&(e.victory?n+=`<h2 class="victory">🏆 Victory!</h2>`:n+=`<h2 class="gameover">☠️ Game Over</h2>`,n+=`
            <p>
                <button id="share">
                    📋 Copy Results
                </button>
            </p>
        `,e.alreadyPlayed)){let e=new Date,t=new Date(e.getFullYear(),e.getMonth(),e.getDate()+1).getTime()-e.getTime(),r=Math.floor(t/36e5),i=Math.floor(t%36e5/6e4),a=Math.floor(t%6e4/1e3);n+=`
                <div class="daily-lock">

                    <h3>⏳ Next dungeon in</h3>

                    <h1>
                        ${r.toString().padStart(2,`0`)}:
                        ${i.toString().padStart(2,`0`)}:
                        ${a.toString().padStart(2,`0`)}
                    </h1>

                </div>
            `}n+=`<table class="board">`;for(let t=0;t<6;t++){n+=`<tr>`;for(let r=0;r<6;r++){let i=e.board.getTile(r,t),a=`⬜`;i.isStart?a=`🟢`:i.isExit?a=`🚪`:i.marked?a=`☠️`:i.revealed&&(a=y(i.content)),n+=`
                <td
                    class="${e.heroX===r&&e.heroY===t?`current`:``}"
                    data-x="${r}"
                    data-y="${t}">
                    <div class="cell">
                        <div class="icon">${a}</div>
                    </div>
                </td>
            `}n+=`</tr>`}n+=`</table>`,t.innerHTML=n,document.getElementById(`share`)?.addEventListener(`click`,()=>{e.copyResults()}),document.getElementById(`explore`)?.addEventListener(`click`,()=>{e.mode=_.Explore,x(e)}),document.getElementById(`mark`)?.addEventListener(`click`,()=>{e.mode=_.Mark,x(e)}),document.getElementById(`scroll`)?.addEventListener(`click`,()=>{e.scrolls!==0&&(e.mode=_.Scroll,x(e))}),t.querySelectorAll(`td`).forEach(t=>{t.addEventListener(`click`,()=>{let n=Number(t.dataset.x),r=Number(t.dataset.y);e.moveTo(n,r)&&x(e)})}),e.gameOver&&e.alreadyPlayed&&setTimeout(()=>x(e),1e3)}function S(e){x(new v(e))}function C(){let e=document.getElementById(`app`);e&&(e.innerHTML=`
       

        <h2>Today's hero</h2>

        <button id="warrior">🛡️ Warrior</button>
        <button id="archer">🏹 Archer</button>
        <button id="mage">🪄 Mage</button>
        
            
    
    <hr>

    <h1>How to Play</h1>




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
    `,document.getElementById(`warrior`).addEventListener(`click`,()=>S(t.Warrior)),document.getElementById(`archer`).addEventListener(`click`,()=>S(t.Archer)),document.getElementById(`mage`).addEventListener(`click`,()=>S(t.Mage)))}C();