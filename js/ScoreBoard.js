let Score = function (name, score) {
    this.name = name;
    this.score = score;

    this.setData = function (name, score) {
        this.name = name;
        this.score = score;
    };
};

function saveScore(ID,playerName) {
    if (window.localStorage.getItem(ID.toString()) !== null) {
        let currentScore = window.localStorage.getItem(ID.toString());
        currentScore = JSON.parse(currentScore);
        if (score >= currentScore.score) {
            playerScore.setData(playerName,score);
            window.localStorage.setItem(ID.toString(), JSON.stringify(playerScore));
        }
    } else {
        playerScore.setData(playerName, score);
        window.localStorage.setItem(ID.toString(), JSON.stringify(playerScore));
    }
}

let champOne = new Score(DEFAULT_CHAMP_ONE_NAME, DEFAULT_CHAMP_ONE_SCORE);
let champTwo = new Score(DEFAULT_CHAMP_TWO_NAME, DEFAULT_CHAMP_TWO_SCORE);
let champThree = new Score(DEFAULT_CHAMP_THREE_NAME, DEFAULT_CHAMP_THREE_SCORE);
let champFour = new Score(DEFAULT_CHAMP_FOUR_NAME, DEFAULT_CHAMP_FOUR_SCORE);
let champFive = new Score(DEFAULT_CHAMP_FIVE_NAME, DEFAULT_CHAMP_FIVE_SCORE);

window.localStorage.setItem("1", JSON.stringify(champOne));
window.localStorage.setItem("2", JSON.stringify(champTwo));
window.localStorage.setItem("3", JSON.stringify(champThree));
window.localStorage.setItem("4", JSON.stringify(champFour));
window.localStorage.setItem("5", JSON.stringify(champFive));

