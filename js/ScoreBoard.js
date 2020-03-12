let Score = function (name, score) {
    this.name = name;
    this.score = score;

    this.setData = function (name, score) {
        this.name = name;
        this.score = score;
    };
};

function saveScore(ID,playerName) {
    let playerScore = new Score();
    playerScore.setData(playerName, score);
    window.localStorage.setItem(ID.toString(), JSON.stringify(playerScore));
}

let champOne = new Score("Đức", 1000);
let champTwo = new Score("NamCT", 700);
let champThree = new Score("Nyan Cat", 500);
let champFour = new Score("420_Blaze_it", 300);
let champFive = new Score("SadPepe :(", 120);

window.localStorage.setItem("1", JSON.stringify(champOne));
window.localStorage.setItem("2", JSON.stringify(champTwo));
window.localStorage.setItem("3", JSON.stringify(champThree));
window.localStorage.setItem("4", JSON.stringify(champFour));
window.localStorage.setItem("5", JSON.stringify(champFive));

