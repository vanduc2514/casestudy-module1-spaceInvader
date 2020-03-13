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

function drawScoreBoard() {
    let scoreBoard = getAndSortScore();
    console.log(scoreBoard);
    let html = "<caption>Những anh hùng đã hy sinh</caption><thead><tr><td>Tên Anh hùng</td><td>Điểm số</td></tr></thead>";
    html += "<tbody>";
    for (let index = 0; index < scoreBoard.length; index++) {
        html += "<tr>";
        html += "<td>" + scoreBoard[index].name + "</td>";
        html += "<td style='text-align: center'>" + scoreBoard[index].score + "</td>";
        html += "</tr>";
    }
    html += "</tbody>";
    table.innerHTML = html;
}

function getAndSortScore() {
    let scoreArr = [];
    for (let index = 1; index <= localStorage.length; index++) {
        let data = window.localStorage.getItem(index.toString());
        data = JSON.parse(data);
        scoreArr.push(data);
    }
    for (let indexOuter = 0; indexOuter < scoreArr.length; indexOuter++) {
        for (let indexInner = 0; indexInner < scoreArr.length - 1; indexInner++) {
            if (scoreArr[indexInner].score < scoreArr[indexInner + 1].score) {
                let temp = scoreArr[indexInner];
                scoreArr[indexInner] = scoreArr[indexInner + 1];
                scoreArr[indexInner + 1] = temp;
            }
        }
    }
    return scoreArr;
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

