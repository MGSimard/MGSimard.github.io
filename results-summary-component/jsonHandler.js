const scoreReaction = document.getElementById("fetch-reaction");
const scoreMemory = document.getElementById("fetch-memory");
const scoreVerbal = document.getElementById("fetch-verbal");
const scoreVisual = document.getElementById("fetch-visual");

loadResults();

function loadResults() {
    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        scoreReaction.innerHTML = data[0].score;
        scoreMemory.innerHTML = data[1].score;
        scoreVerbal.innerHTML = data[2].score;
        scoreVisual.innerHTML = data[3].score;
    })
}