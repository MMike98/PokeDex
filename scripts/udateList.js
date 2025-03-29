function updatemaxLimit() {
    maxLimit = +document.getElementById("maxLimit").value;
    init();
}

function updatePokemonListBack() {
    if (minLimit > 0) {
        minLimit -= maxLimit;
        if(minLimit < 0){
            minLimit = 0;
        }
        init();
    }
}

function updatePokemonListNext() {
    minLimit += maxLimit;
    init();
}

async function PokemonListUpdate(pokemonToJSON) {
    PokemonList.push({
        id: pokemonToJSON.id,
        name: pokemonToJSON.name,
        height: pokemonToJSON.height,
        weight: pokemonToJSON.weight,
        abilities: await getPokemonAbilities(pokemonToJSON),
        types: await getPokemonTypes(pokemonToJSON),
        stats: await getPokemonStats(pokemonToJSON),
        sprites: pokemonToJSON.sprites,
        species: await getAllEvolutions(pokemonToJSON),
    });
}

async function goToPrevious(id) {
    showLoading();
    if (id > 1) {
        id--;
        await creatModal(id);
    }
    hideLoading();
}

async function goToNext(id) {
    showLoading();
    if (id < 1025) {
        id++;
        await creatModal(id);
    }
    hideLoading();
}