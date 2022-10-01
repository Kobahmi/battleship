(()=>{"use strict";const e=class{constructor(e){this.name=e,this.turn=!0}getName=()=>this.name;checkTurn=()=>this.turn;setName=e=>{this.name=e};startTurn=()=>{!1===this.turn&&(this.turn=!0)};endTurn=e=>{!0===this.turn&&(this.turn=!1),e.startTurn()};attack(e,t,a,r){this.checkTurn&&(r.receiveAttack(e,t),this.endTurn(a))}},t=class{constructor(){this.gameBoardArray=this.createGameBoard(),this.missedAttacks=[]}getGameBoard=()=>this.gameBoardArray;getMissedAttacksArray=()=>this.missedAttacks;createGameBoard=()=>{const e=[];let t=[];for(let a=0;a<10;a++){for(let e=0;e<10;e++)t.push({shipName:void 0,shipIndex:void 0});e.push(t),t=[]}return e};checkIfShipPlacementIsValid(e,t,a){if(t>10||t<0||a>10||a<0||a+e>10||t+e>10)return!1;for(let r=a;r<a+e;r++)if(void 0!==this.gameBoardArray[r][t].shipName)return!1;return!0}placeShip=(e,t,a,r)=>{if("v"===r&&this.checkIfShipPlacementIsValid(e.getLength(),t,a))for(let r=0;r<e.getLength();r++)this.gameBoardArray[a+r][t].shipName=e,this.gameBoardArray[a+r][t].shipIndex=r;if("h"===r&&this.checkIfShipPlacementIsValid(e.getLength(),t,a))for(let r=0;r<e.getLength();r++)this.gameBoardArray[a][t+r].shipName=e,this.gameBoardArray[a][t+r].shipIndex=r};receiveAttack=(e,t)=>{void 0===this.gameBoardArray[t][e].shipName?this.missedAttacks.push({x:e,y:t}):this.gameBoardArray[t][e].shipName.hit(this.gameBoardArray[t][e].shipIndex)};checkIfAllShipSunk=()=>{let e=!0;return this.gameBoardArray.forEach((t=>{t.forEach((t=>{t.shipName&&!1===t.shipName.isSunk()&&(e=!1)}))})),e}},a=class{constructor(e){this.length=e,this.ship=this.createShip()}getLength=()=>this.length;getShip=()=>this.ship;createShip=()=>{const e=[];let t=this.length;for(;t>0;)e.push({hit:!1}),t-=1;return e};hit=e=>{this.ship[e].hit=!0};isSunk=()=>!!this.ship.every(this.checkHit);checkHit=e=>!0===e.hit},r=document.querySelector(".modal-one"),s=document.querySelector(".modal-two"),i=document.querySelector(".form-one"),o=(document.querySelector(".form-two"),document.querySelector(".player-name-input")),c=document.querySelector(".player-name"),n=(document.querySelector(".computer-name"),document.querySelector(".playerBoard"),document.querySelector(".computerBoard"),document.querySelector(".addShips")),d=document.querySelector("#battleship"),h=document.querySelector("#carrier"),l=document.querySelector("#submarine"),u=document.querySelector("#destroyer"),m=document.querySelector("#patrolboat"),p=document.querySelector(".aiSide"),y=document.querySelector(".winner-text"),g=new a(5),f=new a(4),S=new a(3),k=new a(3),A=new a(2),v=new a(5),B=new a(4),x=new a(3),I=new a(3),q=new a(2),w=new t,N=new t,b=new e("ScardyCat"),L=new class extends e{constructor(e,t,a){super(e),this.turn=!1,this.enemyPlayer=t,this.enemyBoard=a,this.attackArray=[]}getAttackArray=()=>this.attackArray;generateRandomAttack=()=>{if(this.checkTurn()){const e={x:void 0,y:void 0};for(;;){const t=Math.floor(10*Math.random()),a=Math.floor(10*Math.random());if(e.x=t,e.y=a,!this.attackArray.some((t=>t.x===e.x&&t.y===e.y))){this.attackArray.push(e),this.attack(e.x,e.y,this.enemyPlayer,this.enemyBoard);break}}}}}("COMPUTER",b,w);window.addEventListener("load",(()=>{r.showModal()})),i.addEventListener("submit",(e=>{e.preventDefault();const t=o.value;b.setName(t),c.textContent=`${b.getName()}'s Board`,r.close()}));const $=e=>{e.addEventListener("dragstart",(e=>{e.dataTransfer.setData("text/plain",e.target.id)}))};function E(e){for(;;){let t=[];if(t=[Math.floor(10*Math.random()),Math.floor(10*Math.random())],N.checkIfShipPlacementIsValid(e.getLength(),t[0],t[1])){N.placeShip(e,t[0],t[1],"v");break}}}const M=e=>{const t=document.querySelector(`.${e}`);for(let a=0;a<10;a++)for(let r=0;r<10;r++){const s=document.createElement("div");s.classList.add("cell"),s.setAttribute("data-x",r),s.setAttribute("data-y",a),"computerBoard"===e?s.addEventListener("click",(e=>{C(e.target)})):"playerBoard"===e&&(s.addEventListener("dragover",(e=>{e.preventDefault()})),s.addEventListener("drop",(e=>{e.preventDefault(),P(e)}))),t.appendChild(s)}},C=e=>{const t=e.getAttribute("data-x"),a=e.getAttribute("data-y");b.attack(t,a,L,N),T("computerBoard",N),e.style.pointerEvents="none",N.checkIfAllShipSunk()&&V(b.getName()),L.generateRandomAttack(),T("playerBoard",w),w.checkIfAllShipSunk()&&V("AI")},P=e=>{const t=e.dataTransfer.getData("text"),a=parseInt(e.target.getAttribute("data-x")),r=parseInt(e.target.getAttribute("data-y"));switch(t){case"battleship":if(w.checkIfShipPlacementIsValid(f.length,a,r)){w.placeShip(f,a,r,"v"),T("playerBoard",w);const e=document.querySelector(`#${t}`);n.removeChild(e),n.childNodes.length<=6&&(n.style.display="none",p.style.display="flex")}break;case"carrier":if(w.checkIfShipPlacementIsValid(g.length,a,r)){w.placeShip(g,a,r,"v"),T("playerBoard",w);const e=document.querySelector(`#${t}`);n.removeChild(e),n.childNodes.length<=6&&(n.style.display="none",p.style.display="flex")}break;case"submarine":if(w.checkIfShipPlacementIsValid(k.length,a,r)){w.placeShip(k,a,r,"v"),T("playerBoard",w);const e=document.querySelector(`#${t}`);n.removeChild(e),n.childNodes.length<=6&&(n.style.display="none",p.style.display="flex")}break;case"destroyer":if(w.checkIfShipPlacementIsValid(S.length,a,r)){w.placeShip(S,a,r,"v"),T("playerBoard",w);const e=document.querySelector(`#${t}`);n.removeChild(e),n.childNodes.length<=6&&(n.style.display="none",p.style.display="flex")}break;case"patrolboat":if(w.checkIfShipPlacementIsValid(A.length,a,r)){w.placeShip(A,a,r,"v"),T("playerBoard",w);const e=document.querySelector(`#${t}`);n.removeChild(e),n.childNodes.length<=6&&(n.style.display="none",p.style.display="flex")}}},T=(e,t)=>{const a=t.getGameBoard(),r=t.getMissedAttacksArray();a.forEach(((t,a)=>{t.forEach(((t,r)=>{if(t.shipName)if(!0===t.shipName.checkHit(t.shipName.getShip()[t.shipIndex])){const t=document.querySelector(`.${e} [data-x="${r}"][data-y ="${a}"]`);t.textContent="X",t.classList.add("hit"),t.classList.remove("occupied")}else!1===t.shipName.checkHit(t.shipName.getShip()[t.shipIndex])&&"playerBoard"===e&&document.querySelector(`.${e} [data-x="${r}"][data-y ="${a}"]`).classList.add("occupied")}))})),r.forEach((t=>{const a=document.querySelector(`.${e} [data-x="${t.x}"][data-y ="${t.y}"]`);a.textContent="X",a.classList.add("missed")}))},V=e=>{s.showModal(),y.textContent=`${e} is the winner!!`};$(d),$(h),$(l),$(u),$(m),E(v),E(B),E(x),E(I),E(q),M("playerBoard"),M("computerBoard"),T("playerBoard",w),T("computerBoard",N)})();