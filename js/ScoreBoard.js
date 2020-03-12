let Score = function () {
    this.name;
    this.score;

    this.setData = function (name, score) {
        this.name = name;
        this.score = score;
    };
};

function saveScore(name, score) {
    let player = new Score();
    player.setData(name,score);
    return player;
}
window.localStorage.clear();

window.localStorage.setItem("1",JSON.stringify(saveScore("Đức",1000)));
window.localStorage.setItem("2",JSON.stringify(saveScore("Nam",700)));
window.localStorage.setItem("3",JSON.stringify(saveScore("Nyan Cat",500)));
window.localStorage.setItem("4",JSON.stringify(saveScore("SnoopDogg 420",300)));
window.localStorage.setItem("5",JSON.stringify(saveScore("Sad Pepe",120)));

