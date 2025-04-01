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
    } else {
        minLimit = total - pageSize;
    }
    maxLimit = minLimit + pageSize;
    init();
}

function updatePokemonListNext() {
    if (minLimit + pageSize >= total) {
        minLimit = 0;
    } else {
        minLimit += pageSize;
    }
    maxLimit = minLimit + pageSize;
    if (maxLimit > total) maxLimit = total;
    init();
}

async function goToPrevious(id) {
    if (id > 1) {
        id--;
    } else {
        id = total;
    }
    let found = PokemonList.find(poke => poke.id === id);
    if (found) {
        await openModal(found.name);
    } else {
        showLoading();
        let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let dataJSON = await data.json();
        PokemonList.push(dataJSON);
        hideLoading();
        await openModal(dataJSON.name);
    }
}

async function goToNext(id) {
    if (id < total) {
        id++;
    } else {
        id = 1;
    }
    let found = PokemonList.find(poke => poke.id === id);
    if (found) {
        await openModal(found.name);
    } else {
        showLoading();
        let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let dataJSON = await data.json();
        PokemonList.push(dataJSON);
        hideLoading();
        await openModal(dataJSON.name);
    }
}
