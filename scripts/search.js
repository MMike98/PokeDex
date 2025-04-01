let errorMsg = document.getElementById("error-message");
let cardsContainer = document.getElementById("cards");
let serachList = []

async function searchPokemons() {
    let search = document.getElementById("search").value.toLowerCase();
    if (serachList.length === 0) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
        let data = await response.json();
        serachList = data.results;
    }
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
    let filtered = serachList.filter(poke => poke.name.includes(search));
    if (filtered.length === 0) {
        showErrorMessage("❌ Oops! No Pokémon found with that name, ID or type!");
    } else {
        await getByName(filtered);
    }
}

async function getByName(filtered) {
    showLoading();
    hideButtons();
    cardsContainer.innerHTML = "";
    for (let iPoke = 0; iPoke < filtered.length; iPoke++) {
        let found = PokemonList.find(poke => poke.name === filtered[iPoke].name);
        if (found) {
            cardsContainer.innerHTML += getTemplatePokemon(found);
        } else {
            let response = await fetch(filtered[iPoke].url);
            let data = await response.json();
            PokemonList.push(data);
            cardsContainer.innerHTML += getTemplatePokemon(data);
        }
    }
    hideLoading();
}

async function searchById(search) {
    let id = parseInt(search);
    if (id <= 0 || id > 1025) {
        showErrorMessage("⚠️Oops! Pokémon ID must be between 1 and 1025!");
        return;
    }
    let found = PokemonList.find(poke => poke.id === id);
    showLoading();
    hideButtons();
    if (found) {
        cardsContainer.innerHTML = getTemplatePokemon(found);
    } else {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let data = await response.json();
        PokemonList.push(data);
        cardsContainer.innerHTML = getTemplatePokemon(data);
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
    document.getElementById("cards").style.display = "none";
    cardsContainer.innerHTML = "";
    for (let iPoke = 0; iPoke < pokemonsData.length; iPoke++) {

        let found = PokemonList.find(poke => poke.name === pokemonsData[iPoke].pokemon.name);

        if (found) {
            if (found.id < 1300) {
                cardsContainer.innerHTML += getTemplatePokemon(found);
            }
        } else {
            let pokemon = await fetch(pokemonsData[iPoke].pokemon.url);
            pokemonToJSON = await pokemon.json();
            if (pokemonToJSON.id < 1300) {
                cardsContainer.innerHTML += getTemplatePokemon(pokemonToJSON);
            }
        }
    }
    document.getElementById("cards").style.display = "flex";
    hideLoading();
}

function hideButtons() {
    document.getElementById("Amount").style.display = "none";
    document.getElementById("Btns").style.display = "none";
}