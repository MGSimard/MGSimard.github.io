/*eslint-env es6*/
/*eslint-env browser*/
/* eslint no-console: "off" */
const sumId = document.getElementById("SUM-SUMID");
const sumAccId = document.getElementById("SUM-ACCID");
const sumPUUID = document.getElementById("SUM-PUUID");
const sumAvatar = document.getElementById("SUM-AVATAR");
const sumLevel = document.getElementById("SUM-LEVEL");
const sumName = document.getElementById("SUM-NAME");
const sumName2 = document.getElementById("SUM-NAME2");
const sumRank = document.getElementById("SUM-RANK");
const cblStatus = document.getElementById("SUM-CBLSTATUS");

const inputSummoner = document.getElementById("SUMSEARCH-NAME");
const inputRegion = document.getElementById("SUMSEARCH-REGION");
const inputSubmit = document.getElementById("SUMSEARCH-SUBMIT");

//I HAVE NO IDEA HOW TO SECURE MY APIKEY SERVER-SIDE I DO FRONTEND LOL
const apiKey = "RGAPI-ddc3814a-277f-493b-b65b-66403bc7fb7d";
const keyURL = "?api_key=" + apiKey;

//TRANSLATE ENTER KEY EVENT INTO A CLICK EVENT IN SUMMONER NAME FIELD
inputSummoner.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        inputSubmit.click();
    }
});

//START PROCESS IF EVENT IS TRIGGERED AND A REGION + SUMMONER NAME WAS ENTERED
inputSubmit.addEventListener('click', () => {
    if (!inputRegion.value || !inputSummoner.value) {
        alert("Invalid Submission (Missing Region or Summoner Name)")
    } else {
        summonerDataHandler();
    }
});

//CREATE FUNCTION TO CHECK IF PUUID EXISTS WITHIN BAN LIST
function searchfDB(puuid, callback){ 
    $.get("./flagged.txt", function(data) {
        const contains = (data.indexOf(puuid) > -1);
        callback(contains);
    }, 'text');
}

async function summonerDataHandler() {
    //CLEAR MATCH HISTORY IF NOT ALREADY EMPTY
    const existingMatches = document.getElementById("match-history-container");
    if (existingMatches.innerHTML) {existingMatches.innerHTML = "";}
    
    //GET LATEST DATADRAGON VERSION
    const ddVer = await fetch("https://ddragon.leagueoflegends.com/api/versions.json").then(response => response.json()).then (data => data[0]);
    
    //FETCH SUMMONERV4 BY-NAME
    fetch("https://" + inputRegion.value + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + inputSummoner.value + keyURL)
    .then (response => {
        if (response.status === 200) {
            console.log("Summoner Found, status code : " + response.status);
            return response.json();
        } else {
            alert("Summoner not found, status code: " + response.status);
        }
    })
    .then (data => {
        const {id, accountId, puuid, name, profileIconId, revisionDate, summonerLevel} = data;
        
        //FETCH SUMMONERV4 BY-SUMMONER (RANKED DATA)
        fetch("https://" + inputRegion.value + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + id + keyURL)
        .then (response => response.json())
        .then (data3 => {
            if (data3 == "") {
                sumRank.textContent = "UNRANKED";
            } else {
                const {queueType, tier, rank, leaguePoints} = data3[0];
                sumRank.textContent = tier + " " + rank + " " + leaguePoints + "lp (" + queueType + ")";
            }
        })
        
        //WRITE SUMMONER DATA
        sumAvatar.src = "https://ddragon.leagueoflegends.com/cdn/" + ddVer + "/img/profileicon/" + profileIconId + ".png";
        sumLevel.textContent = summonerLevel;
        sumName.textContent = name;
        sumName2.textContent = name;
        sumId.textContent = id;
        sumAccId.textContent = accountId;
        sumPUUID.textContent = puuid;
        
        statusHandler(puuid);
        document.getElementById("summoner-data").scrollIntoView();
        matchHandler(puuid, inputRegion.value, ddVer);
    })
}

//GET PLAYER'S CBL STATUS & DISPLAY ON PAGE
function statusHandler(statusPuuid) {
    searchfDB(statusPuuid, function (matched) {
        if (matched) {
            cblStatus.innerHTML = "<span style='color: var(--riotRed)'>FLAGGED</span>";
        } else {
            cblStatus.innerHTML = "<span style='color:green'>CLEAN</span>";
        }
    })    
}

function matchHandler(targetPuuid, matchRegion, ddVer){
    let regionCluster;
    //GET SERVER CLUSTER FROM REGION
    switch(matchRegion) {
        case "NA1":case "BR1":case "LA1":case "LA2": 
            regionCluster = "americas";
            break;
        case "KR":case "JP1": 
            regionCluster = "asia";
            break;
        case "EUW1":case "EUN1":case "TR1":case "RU": 
            regionCluster = "europe";
            break;
        case "OC1":case "SG2":case "PH2":case "TW2":case "VN2":case "TH2": 
            regionCluster = "sea";
            break;
        default: console.log("Invalid Region");
    }
    buildMatches(targetPuuid, regionCluster, ddVer)
}

//Learned how to use async awaits I think? Less annoying than nesting fetches into fetches into fetches and helps with correct order of matches
async function buildMatches(targetPuuid, regionCluster, ddVer) {
    //GET MATCH CARD TEMPLATE
    const template = document.getElementById("match-template");
    
    //GET DATA LISTS
    const modeList = await fetch("https://static.developer.riotgames.com/docs/lol/queues.json").then(response => response.json());
    const allChamps = await fetch("https://ddragon.leagueoflegends.com/cdn/" + ddVer + "/data/en_US/champion.json").then(response => response.json()).then(data => data.data);
    const sumSpells = await fetch("https://ddragon.leagueoflegends.com/cdn/" + ddVer + "/data/en_US/summoner.json").then(response => response.json()).then(data => data.data);
    const runesReforged = await fetch("https://ddragon.leagueoflegends.com/cdn/" + ddVer + "/data/en_US/runesReforged.json").then(response => response.json());
    const itemList = await fetch("https://ddragon.leagueoflegends.com/cdn/" + ddVer + "/data/en_US/item.json").then(response => response.json()).then(data => data.data);
    
    //LAST TEN MATCHES
    const matches = await fetch("https://" + regionCluster + ".api.riotgames.com/lol/match/v5/matches/by-puuid/" + targetPuuid + "/ids?start=0&count=10" + "&api_key=" + apiKey).then(response => response.json());
    
    //FOR EACH OF THE X MATCHES DO THIS
    for (let i = 0; i < matches.length; i++) {
        //SIMPLIFIED DATA BANKS
        const matchId = matches[i];
        const matchInfo = await fetch("https://" + regionCluster + ".api.riotgames.com/lol/match/v5/matches/" + matchId + keyURL).then(response => response.json());
        const matchType = modeList.find(gameTypes => gameTypes.queueId == matchInfo.info.queueId);
        const matchDuration = Math.floor(matchInfo.info.gameDuration/60) + "m" + Math.floor(matchInfo.info.gameDuration%60) + "s";
        const playerPos = matchInfo.metadata.participants.findIndex(players => players === targetPuuid);
        const targetPlayerData = matchInfo.info.participants[playerPos];
        const playerList = matchInfo.info.participants;
        
        //RELATIVE TIME UNIX SETUP
        const currentUnix = Math.floor(new Date().getTime() / 1000);
        const gameStartUnix = Math.floor(matchInfo.info.gameStartTimestamp / 1000);
        const gameEndUnix = gameStartUnix + matchInfo.info.gameDuration;
        const timeSinceEnd = currentUnix - gameEndUnix;
        
        //SIMPLIFY SOME PLAYER STATS
        const playerKills = targetPlayerData.kills;
        const playerDeaths = targetPlayerData.deaths;
        const playerAssists = targetPlayerData.assists;
        const playerKDA = playerDeaths ? ((playerKills + playerAssists)/playerDeaths).toFixed(2) : playerKills + playerAssists;
        const playerCS = targetPlayerData.totalMinionsKilled;
        const playerRuneSecondary = runesReforged.find(runeSets => runeSets.id == targetPlayerData.perks.styles[1].style);
        
        //CLONE MATCH CARD TEMPLATE, MODIFY THEN APPEND
        const cloneCard = template.content.cloneNode(true);
        
        //GET EACH THING TO BE MODIFIED
        const statMatchCard = cloneCard.querySelector("div.matchCard");
        const statChampion = cloneCard.querySelector("div.mc-champ-bg");
        const statGamemode = cloneCard.querySelector("div.mc-gametype");
        const statSinceEnd = cloneCard.querySelector("small.mc-date");
        const statOutcome = cloneCard.querySelector("div.mc-outcome");
        const statLevel = cloneCard.querySelector("div.mc-level");       
        const statKDA = cloneCard.querySelector("div.mc-stats-score");
        const statPlus = cloneCard.querySelector("div.mc-stats-extra");
        const statPlayers = cloneCard.querySelectorAll("div.mc-player");
        const statSumSpell1 = cloneCard.querySelector("img.mc-sumSpell1");
        const statSumSpell2 = cloneCard.querySelector("img.mc-sumSpell2");
        const statRune1 = cloneCard.querySelector("img.mc-rune1");
        const statRune2 = cloneCard.querySelector("img.mc-rune2");
        const statItems = cloneCard.querySelectorAll("div.mc-item");
        
        //CHAMPION FRAME
        statChampion.setAttribute("style", "background-image: linear-gradient(to right, transparent, var(--lolBlue6)), url('https://ddragon.leagueoflegends.com/cdn/" + ddVer + "/img/champion/" + Object.entries(allChamps).find(([champ, info]) => info.key == targetPlayerData.championId)[1].image.full);
        
        //GAME MODE & DURATION
        let playedMode;        
        switch (matchType.queueId) {
            case 420: playedMode = "RANKED";break;
            case 400: playedMode = "DRAFT PICK";break;
            case 430: playedMode = "BLIND PICK";break;
            case 440: playedMode = "RANKED FLEX";break;
            case 450: playedMode = "ARAM";break;
            case 700: playedMode = "CLASH";break;
            case 720: playedMode = "ARAM CLASH";break;
            case 820:case 830:case 840:case 850: playedMode = "Co-op vs. AI";break;
            case 900: playedMode = "ARURF";break;
            case 1020: playedMode = "ONE FOR ALL";break;
            case 1300: playedMode = "NEXUS BLITZ";break;
            case 1400: playedMode = "ULTIMATE SPELLBOOK";break;            
            case 1900:case 76: playedMode = "URF";break;
            case 2000:case 2010:case 2020: playedMode = "TUTORIAL";break;
            case 75: playedMode = "HEXAKILL";break;
            default: playedMode = matchType.description;
        }
        statGamemode.innerHTML = playedMode + " <span class='mc-gamelength regular'>(" + matchDuration + ")</span>";
        
        //RELATIVE TIME ELAPSED SINCE GAME END
        let output;
        if (timeSinceEnd < 60) {output = timeSinceEnd + " seconds ago"}
        else if (timeSinceEnd < 120) {output = Math.floor(timeSinceEnd / 60) + " minute ago"}
        else if (timeSinceEnd < 3600) {output = Math.floor(timeSinceEnd / 60 ) + " minutes ago"}
        else if (timeSinceEnd < 7200) {output = Math.floor(timeSinceEnd / 3600) + " hour ago"}
        else if (timeSinceEnd < 86400) {output = Math.floor(timeSinceEnd / 3600) + " hours ago"}
        else if (timeSinceEnd < 172800) {output = Math.floor(timeSinceEnd / 86400) + " day ago"}
        else if (timeSinceEnd < 604800) {output = Math.floor(timeSinceEnd / 86400) + " days ago"}
        else if (timeSinceEnd < 1209600) {output = Math.floor(timeSinceEnd / 604800) + " week ago"}
        else if (timeSinceEnd < 2628000) {output = Math.floor(timeSinceEnd/ 604800) + " weeks ago"}
        else if (timeSinceEnd < 5256000) {output = Math.floor(timeSinceEnd / 2620800) + " month ago"}
        else if (timeSinceEnd < 31536000) {output = Math.floor(timeSinceEnd / 2620800) + " months ago"} //Not going past months, years is too large for accuracy's sake
        statSinceEnd.innerHTML = output;
        
        //MATCH OUTCOME
        const outcomeString = (targetPlayerData.win) ? "VICTORY" : "DEFEAT";
        statOutcome.innerHTML = outcomeString;
        if (!targetPlayerData.win) {
            statMatchCard.style.backgroundColor = "#280909";
            statOutcome.style.color = "#d13639";
        } else {
            statOutcome.style.color = "#0AC8B9";
        }
        
        //CHAMPION LEVEL
        statLevel.innerHTML = targetPlayerData.champLevel;
        
        //SUMMONER SPELLS
        statSumSpell1.setAttribute("src","https://ddragon.leagueoflegends.com/cdn/" + ddVer + "/img/spell/" + Object.entries(sumSpells).find(([spell, info]) => info.key == targetPlayerData.summoner1Id)[1].image.full);
        statSumSpell2.setAttribute("src","https://ddragon.leagueoflegends.com/cdn/" + ddVer + "/img/spell/" + Object.entries(sumSpells).find(([spell, info]) => info.key == targetPlayerData.summoner2Id)[1].image.full);
        
        //RUNES
        let selectedKeystone;
        for (let k = 0; k < runesReforged.length; k++) {
            const runeTest = runesReforged[k].slots[0].runes.find(keystones => keystones.id == targetPlayerData.perks.styles[0].selections[0].perk);
            if (runeTest) {
                selectedKeystone = runeTest.icon;
            }
        }
        statRune1.setAttribute("src", "https://ddragon.canisback.com/img/" + selectedKeystone)
        statRune2.setAttribute("src", "https://ddragon.canisback.com/img/" + playerRuneSecondary.icon);
        
        //PLAYER KDA
        statKDA.innerHTML = playerKills
            + "<span class='mcss-slash'> / </span>" 
            + "<span class='mcss-deaths'>" + playerDeaths + "</span>" 
            + "<span class='mcss-slash'> / </span>" 
            + playerAssists;
        statPlus.innerHTML = playerKDA + " KDA - " + playerCS + " CS";
        
        //ITEMS
        for (let h = 0; h < 7; h++) {
            const itemPath = eval("targetPlayerData.item" + h);
            
            if (itemPath) {
                statItems[h].setAttribute("style","background-image: url(https://ddragon.leagueoflegends.com/cdn/" + ddVer + "/img/item/" + itemList[itemPath].image.full+")");
            }
        }
        
        //LIST PLAYERS IN EACH TEAM
        for (let j = 0; j < playerList.length; j++) {
            statPlayers[j].innerHTML = playerList[j].summonerName;
        }
        
        document.getElementById("match-history-container").appendChild(cloneCard);
    }
}
