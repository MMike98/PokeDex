async function getPokemonsInfo(pokemonsData) {
    for (let iPoke = 0; iPoke < pokemonsData.length; iPoke++) {
        let pokemon = await fetch(pokemonsData[iPoke].url);
        let pokemonToJSON = await pokemon.json();
        await PokemonListUpdate(pokemonToJSON)
    }
}

function getPokemonAbilities(data) {
    return data.abilities.map(ability => ability.ability.name).join(', ');
}

function getPokemonTypes(pokemonToJSON) {
    return pokemonToJSON.types.map(type => {
        return {
            type: type.type.name,
        }
    })
}

function getPokemonStats(pokemonToJSON) {
    return pokemonToJSON.stats.map(stat => {
        return {
            name: stat.stat.name,
            base_stat: stat.base_stat
        }
    });
}

async function getAllEvolutions(data) {
    let speciesResponse = await fetch(data.species.url);
    let speciesData = await speciesResponse.json();
    let evolutionResponse = await fetch(speciesData.evolution_chain.url);
    let evolutionData = await evolutionResponse.json();
    let evolutionStages = [];

    await getEvolution1(evolutionData, evolutionStages)
    await getEvolution2(evolutionData, evolutionStages)
    await getEvolution3(evolutionData, evolutionStages)
    return evolutionStages.map(stage => {
        return {
            Name: stage.name,
            Imagem: stage.image,
            ImagemShinny: stage.imageshinny
        }
    });
}

async function getEvolution1(evolutionData, evolutionStages) {
    let evolution1 = {
        name: evolutionData.chain.species.name,
        image: await getPokemonImage(evolutionData.chain.species.url),
        imageshinny: await getPokemonImageShinny(evolutionData.chain.species.url)
    };
    evolutionStages.push(evolution1);
}

async function getEvolution2(evolutionData, evolutionStages) {
    if (evolutionData.chain.evolves_to.length > 0) {
        let evolution2 = {
            name: evolutionData.chain.evolves_to[0].species.name,
            image: await getPokemonImage(evolutionData.chain.evolves_to[0].species.url),
            imageshinny: await getPokemonImageShinny(evolutionData.chain.evolves_to[0].species.url)
        };
        evolutionStages.push(evolution2);
    }
}

async function getEvolution3(evolutionData, evolutionStages) {
    if (evolutionData.chain.evolves_to.length > 0 && evolutionData.chain.evolves_to[0].evolves_to.length > 0) {
        let evolution3 = {
            name: evolutionData.chain.evolves_to[0].evolves_to[0].species.name,
            image: await getPokemonImage(evolutionData.chain.evolves_to[0].evolves_to[0].species.url),
            imageshinny: await getPokemonImageShinny(evolutionData.chain.evolves_to[0].evolves_to[0].species.url)
        };
        evolutionStages.push(evolution3);
    }
}