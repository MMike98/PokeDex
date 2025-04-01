
let PokemonTypes = ["normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
let PokemonList = [];
let modal = new bootstrap.Modal(document.getElementById("pokemonModal"));
let minLimit = 0;
let maxLimit = 20;
let pageSize = 20;
let total = 1025;
let response;
let data;

async function init() {
    showLoading();
    document.getElementById("cards").style.display = "none";
    document.getElementById("Amount").style.display = "flex";
    document.getElementById("Btns").style.display = "flex";
    await loadAllPokemons();
    document.getElementById("cards").style.display = "flex";
    hideLoading();
    await preLoadPokemons();
}

async function loadAllPokemons() {
    if (PokemonList.length < pageSize) {
        data = await pokeApiFetch();
    }
    let cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";
    for (let iPoke = minLimit; iPoke < maxLimit; iPoke++) {
        let pokemonExistente = PokemonList.find(poke => poke.index === iPoke);
        if (pokemonExistente) {
            cardsContainer.innerHTML += getTemplatePokemon(pokemonExistente);
        } else {
            let pokemonInfo = await fetch(data.results[iPoke].url);
            let pokemonToJSON = await pokemonInfo.json();
            pokemonToJSON.index = iPoke;
            PokemonList.push(pokemonToJSON);
            cardsContainer.innerHTML += getTemplatePokemon(pokemonToJSON);
        }
    }
}

async function preLoadPokemons() {
    if (PokemonList.length >= maxLimit * 2) return;
    let data = await pokeApiFetch();
    preLoadPokemonsNext(data);
    preLoadPokemonsBack(data)
}

async function preLoadPokemonsNext(data) {
    for (let iPoke = minLimit - pageSize; iPoke < minLimit; iPoke++) {
        let realIndex = iPoke;
        if (iPoke < 0) {
            realIndex = total + iPoke;
        }
        if (realIndex >= 0 && realIndex < total) {
            let alreadyLoaded = PokemonList.find(p => p.index === realIndex);
            if (!alreadyLoaded) {
                let pokemonInfo = await fetch(data.results[realIndex].url);
                let pokemonToJSON = await pokemonInfo.json();
                pokemonToJSON.index = realIndex;
                PokemonList.push(pokemonToJSON);
            }
        }
    }
}

async function preLoadPokemonsBack(data) {
    for (let iPoke = maxLimit; iPoke < maxLimit + pageSize; iPoke++) {
        if (iPoke >= data.results.length) continue;
        let pokemonInfo = await fetch(data.results[iPoke].url);
        let pokemonToJSON = await pokemonInfo.json();
        pokemonToJSON.index = iPoke;
        PokemonList.push(pokemonToJSON);
    }
}

async function pokeApiFetch() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${total}`);
    let data = await response.json();
    return data;
}

async function openModal(name) {
    let modalBody = document.getElementById("modal-content");
    let data = PokemonList.find(pokemon => pokemon.name === name);
    if (data) {
        modalBody.innerHTML = await modalPokemon(data);
        modal.show();
        preLoadmodal(data.id)
    } else {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let data = await response.json();
        PokemonList.push(data);
        modalBody.innerHTML = await modalPokemon(data);
        modal.show();
        preLoadmodal(data.id)
    }
}

async function preLoadmodal(id) {
    id++;
    if (id > total) id = 1;
    let found = PokemonList.find(poke => poke.id === id);
    if (!found) {
        await fetchById(id);
    }
    id -= 2;
    if (id <= 0) id = total;
    found = PokemonList.find(poke => poke.id === id);
    if (!found) {
        await fetchById(id);
    }
}

async function fetchById(id) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = await response.json();
    PokemonList.push(data);
}

async function getPokemonImage(name) {
    let dataImage = PokemonList.find(pokemon => pokemon.name === name);
    if (dataImage) {
        return dataImage.sprites.front_default;
    } else {
        showLoading();
        let dataImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let dataImageJSON = await dataImage.json();
        PokemonList.push(dataImageJSON);
        hideLoading();
        return dataImageJSON.sprites.front_default;
    }
}

async function getPokemonImageShinny(name) {
    let dataImage = PokemonList.find(pokemon => pokemon.name === name);
    if (dataImage) {
        return dataImage.sprites.front_shiny;
    } else {
        showLoading();
        let dataImage = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let dataImageJSON = await dataImage.json();
        PokemonList.push(dataImageJSON);
        hideLoading();
        return dataImageJSON.sprites.front_shiny;
    }
}