export default function Lottery (btn, selector) {

    const getWinner = (selector) => {
     
        const $players = document.querySelectorAll(selector),
        random = Math.floor(Math.random() * $players.length),
        winner = $players[random];
        console.log(winner);
        return `${winner.textContent} is the winner winner chicken dinner`;
    }

    document.addEventListener("click",(e)=>{
        if (e.target.matches(btn)) {
            let result = getWinner(selector);
            alert(result);
        }
    });

}

