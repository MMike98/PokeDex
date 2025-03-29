
let PokemonTypes = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
let PokemonList = [];
let allPokemonList = [];
let modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
let minLimit = 0;
let maxLimit = 20;
let pageSize = 20;


async function init() {
    showLoading();
    document.getElementById("Amount").style.display = "flex";
    document.getElementById("Btns").style.display = "flex";
    await loadAllPokemons();
    await renderPokemons();
    hideLoading();
}

async function loadAllPokemons() {
    allPokemonList = [];
    PokemonList = [];
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
    let data = await response.json();
    data.results.forEach(pokemon => {
        allPokemonList.push({
            name: pokemon.name,
            info: pokemon.url
        });
    });
}

async function renderPokemons() {
    let cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";
    for (let iPoke = minLimit; iPoke < maxLimit; iPoke++) {
        PokemonList.push({
            name: allPokemonList[iPoke].name,
            info: allPokemonList[iPoke].info
        });
        let pokemonInfo = await fetch(allPokemonList[iPoke].info);
        let pokemonToJSON = await pokemonInfo.json();
        cardsContainer.innerHTML += getTemplatePokemon(pokemonToJSON);
    }    
}

async function openModal(name) {
    showLoading();
    let modalBody = document.getElementById("modal-content");

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let data = await response.json();

    modalBody.innerHTML = await modalPokemon(data);
    hideLoading();
    modal.show();
}


async function getPokemonImage(pokemonUrl) {
    let response = await fetch(pokemonUrl);
    let data = await response.json();
    let responseImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
    let dataImage = await responseImage.json();
    return dataImage.sprites.front_default;
}

async function getPokemonImageShinny(pokemonUrl) {
    let response = await fetch(pokemonUrl);
    let data = await response.json();
    let responseImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
    let dataImage = await responseImage.json();
    return dataImage.sprites.front_shiny;
}