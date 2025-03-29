function updatemaxLimit() {
    pageSize = +document.getElementById("maxLimit").value;
    if (pageSize < 1)
        pageSize = 1;

    minLimit = 0;
    maxLimit = pageSize;
    init();
}

function updatePokemonListBack() {
    if (minLimit > 0) {
        minLimit -= pageSize;
        if (minLimit < 0) minLimit = 0;
        maxLimit = minLimit + pageSize;
        init();
    }
}

function updatePokemonListNext() {
    minLimit += pageSize;
    maxLimit = minLimit + pageSize;
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
    if (id > 1) {
        id--;
    } else {
        id = 1025;
    }

    modal.hide();
    document.activeElement.blur()
    setTimeout(async () => {
        await openModal(id);
    }, 300);
}

async function goToNext(id) {
    if (id < 1025) {
        id++;
    } else {
        id = 1;
    }

    modal.hide();
    document.activeElement.blur()
    setTimeout(async () => {
        await openModal(id);
    }, 300);
}
