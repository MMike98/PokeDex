async function searchPokemons() {
    showLoading();
    hideButtons();
    let search = document.getElementById("search").value.toLowerCase();
    PokemonList = [];

    if (PokemonTypes.includes(search)) {
        await searchType(search);
    }
    else if (search.length >= 3) {
        await searchByPartialName(search);
    }
    else {
        await searchId(search);
    }
    hideLoading();
}

async function searchByPartialName(search) {
    let filtered = allPokemonList.filter(poke => poke.name.includes(search)
    );
    let cardsContainer = document.getElementById("cards");
    cardsContainer.innerHTML = "";
    if (filtered.length === 0) {
        alert("Pokemon not found");
        await init();
        return;
    }
    for (let iPoke = 0; iPoke < filtered.length; iPoke++) {
        let response = await fetch(filtered[iPoke].info);
        let data = await response.json();
        cardsContainer.innerHTML += getTemplatePokemon(data);
    }
}

function hideButtons() {
    document.getElementById("Amount").style.display = "none";
    document.getElementById("Btns").style.display = "none";
}

async function searchId(search) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    if (response.status == 404) {
        alert("Pokemon not found");
        console.clear();
        init();
        return;
    }
    else {
        let data = await response.json();
        let cardsContainer = document.getElementById("cards");
        cardsContainer.innerHTML = "";
        cardsContainer.innerHTML += getTemplatePokemon(data);
    };
}


async function searchType(search) {
    let response = await fetch(`https://pokeapi.co/api/v2/type/${search}`);
    let data = await response.json();
    await getPokemonsInfoType(data.pokemon);
}

async function getPokemonsInfoType(pokemonsData) {
    for (let iPoke = 0; iPoke < pokemonsData.length; iPoke++) {
        let pokemon = await fetch(pokemonsData[iPoke].pokemon.url);
        pokemonToJSON = await pokemon.json();

        if (pokemonToJSON.id < 1300) {
            await PokemonListUpdate(pokemonToJSON);
        }
    }
}