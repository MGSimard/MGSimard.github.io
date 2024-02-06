const scoreReaction = document.getElementById("fetch-reaction");
const scoreMemory = document.getElementById("fetch-memory");
const scoreVerbal = document.getElementById("fetch-verbal");
const scoreVisual = document.getElementById("fetch-visual");
const scoreAvg = document.getElementById("user-score");

loadResults();

function loadResults() {
    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        const average = Math.floor((data[0].score + data[1].score + data[2].score + data[3].score)/4)
        scoreAvg.innerHTML = average;
        scoreReaction.innerHTML = data[0].score;
        scoreMemory.innerHTML = data[1].score;
        scoreVerbal.innerHTML = data[2].score;
        scoreVisual.innerHTML = data[3].score;        
    })
}