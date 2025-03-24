
let PokemonTypes = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
let PokemonList = [];
let minLimit = 0;
let maxLimit = 20;

async function init() {
    showLoading();
    document.getElementById("Amount").style.display = "flex";
    document.getElementById("Btns").style.display = "flex";
    await loadPokemons();
    hideLoading();
}

function getPokemonAPI() {
    return `https://pokeapi.co/api/v2/pokemon?offset=${minLimit}&limit=${maxLimit}`;
}

async function loadPokemons() {
    PokemonList = [];
    response = await fetch(getPokemonAPI());
    data = await response.json();
    await getPokemonsInfo(data.results);
    renderPokemons();
}

async function renderPokemons() {
    let cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";

    for (let iPoke = 0; iPoke < PokemonList.length; iPoke++) {
        cardsContainer.innerHTML += getTemplatePokemon(iPoke);
    }
}

async function creatModal(id) {
    let modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
    let modalBody = document.getElementById("modal-content");
    openModal(id, modal, modalBody);
}

async function openModal(id, modal, modalBody) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = await response.json();
    PokemonList= [];
    await PokemonListUpdate(data);
    modalBody.innerHTML = modalPokemon(0);
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

async function updateModal(name) {
    let response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`);
    let data = await response.json();
    let id = data.id;
    creatModal(id);
}

