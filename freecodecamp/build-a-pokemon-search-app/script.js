const fetchUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

const elemName = document.getElementById("pokemon-name");
const elemID = document.getElementById("pokemon-id");
const elemWeight = document.getElementById("weight");
const elemHeight = document.getElementById("height");
const elemImgContainer = document.getElementById("sprite-container");
const elemTypes = document.getElementById("types");

const elemHP = document.getElementById("hp");
const elemAttack = document.getElementById("attack");
const elemDefense = document.getElementById("defense");
const elemSpAtt = document.getElementById("special-attack");
const elemSpDef = document.getElementById("special-defense");
const elemSpeed = document.getElementById("speed");

form.addEventListener("submit", e => {
  e.preventDefault();
  const searched = searchInput.value.toLowerCase();
  resetState();
  searchPokemon(searched);
})

const searchPokemon = async (searched) => {
  try {
    const pokemonList = await fetch(fetchUrl + searched);
    const data = await pokemonList.json();

    const { name, id, height, weight } = data;
    const sprite = data.sprites.front_default;
    const types = data.types;
    const hp = data.stats[0].base_stat;
    const att = data.stats[1].base_stat;
    const def = data.stats[2].base_stat;
    const spAtt = data.stats[3].base_stat;
    const spDef = data.stats[4].base_stat;
    const speed = data.stats[5].base_stat;
    

    elemName.textContent = name.toUpperCase();
    elemID.textContent = `#${id}`;
    elemWeight.textContent = weight;
    elemHeight.textContent = height;
    elemImgContainer.innerHTML = `<img id="sprite" src="${sprite}">`
    types.forEach(type => elemTypes.innerHTML += `
      <div class="${type.type.name} pokeType">${type.type.name.toUpperCase()}</div>
    `);
    elemHP.textContent = hp;
    elemAttack.textContent = att;
    elemDefense.textContent = def;
    elemSpAtt.textContent = spAtt;
    elemSpDef.textContent = spDef;
    elemSpeed.textContent = speed;
  }
  catch (err) {
    alert("Pokémon not found");
    console.log("Invalid Pokémon");
  }
}

const resetState = () => {
    searchInput.value = "";
    elemName.textContent = "";
    elemID.textContent = "";
    elemImgContainer.innerHTML = "";
    elemTypes.innerHTML = "";
    elemHP.textContent = "";
    elemAttack.textContent = "";
    elemDefense.textContent = "";
    elemSpAtt.textContent = "";
    elemSpDef.textContent = "";
    elemSpeed.textContent = "";
}