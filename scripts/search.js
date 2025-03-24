async function searchPokemons() {
    showLoading();
    hideButtons();
    let search = document.getElementById("search").value.toLowerCase();
    PokemonList = [];
    if (PokemonTypes.includes(search)) {
        await searchType(search);
    }
    else {
        await searchNameId(search)
    }
    renderPokemons();
    hideLoading();
}

function hideButtons() {
    document.getElementById("Amount").style.display = "none";
    document.getElementById("Btns").style.display = "none";
}

async function searchNameId(search) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    if (response.status == 404) {
        alert("Pokemon not found");
        init();
        return;
    }
    else {
        let data = await response.json();
        await PokemonListUpdate(data);
    }
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