let errorMsg = document.getElementById("error-message");
let cardsContainer = document.getElementById("cards");

async function searchPokemons() {
    let search = document.getElementById("search").value.toLowerCase();
    PokemonList = [];
    if (search === "") {
        showErrorMessage("⚠️Oops! You need to enter a Pokémon name, ID or type first!");
        return;
    }
    if (isNaN(search)) {
        await searchByName(search);
    }
    if (!isNaN(search)) {
        await searchById(search);
    }
}

function showErrorMessage(Message) {
    errorMsg.innerText = Message;
    errorMsg.style.display = "block";
    setTimeout(() => {
        errorMsg.style.display = "none";
    }, 3000);
    return;
}

async function searchByName(search) {
    if (search.length < 3) {
        showErrorMessage("⚠️Too short! Try typing at least 3 letters to find your Pokémon.");
        return;
    }
    else {
        if (PokemonTypes.includes(search)) {
            await searchByType(search);
        }
        else {
            searchByPokeName(search);
        }
    }
}

async function searchByPokeName(search) {
    let filtered = allPokemonList.filter(poke => poke.name.includes(search));
    if (filtered.length === 0) {
        showErrorMessage("❌ Oops! No Pokémon found with that name, ID or type!");
    }
    else {
        await getByName(filtered);
    }
}

async function getByName(filtered) {
    showLoading();
    hideButtons();
    cardsContainer.innerHTML = "";
    for (let iPoke = 0; iPoke < filtered.length; iPoke++) {
        let response = await fetch(filtered[iPoke].info);
        let data = await response.json();
        cardsContainer.innerHTML += getTemplatePokemon(data);
    }
    hideLoading();
}

async function searchById(search) {
    showLoading();
    try {
        hideButtons();
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
        let data = await response.json();
        cardsContainer.innerHTML = getTemplatePokemon(data);
    } catch (error) {
        console.clear();
        showErrorMessage("❌ Oops! No Pokémon found with that name, ID or type!");
    }
    hideLoading();
}


async function searchByType(search) {
    let response = await fetch(`https://pokeapi.co/api/v2/type/${search}`);
    let data = await response.json();
    await getPokemonsInfoType(data.pokemon);
}

async function getPokemonsInfoType(pokemonsData) {
    showLoading();
    hideButtons();
    cardsContainer.innerHTML = "";
    for (let iPoke = 0; iPoke < pokemonsData.length; iPoke++) {
        let pokemon = await fetch(pokemonsData[iPoke].pokemon.url);
        pokemonToJSON = await pokemon.json();
        if (pokemonToJSON.id < 1300) {
            cardsContainer.innerHTML += getTemplatePokemon(pokemonToJSON);
        }
    }
    hideLoading();
}

function hideButtons() {
    document.getElementById("Amount").style.display = "none";
    document.getElementById("Btns").style.display = "none";
}