function getPokemonAbilities(data) {
    return data.abilities.map(ability => ability.ability.name).join(', ');
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
        image: await getPokemonImage(evolutionData.chain.species.name),
        imageshinny: await getPokemonImageShinny(evolutionData.chain.species.name)
    };
    evolutionStages.push(evolution1);
}

async function getEvolution2(evolutionData, evolutionStages) {
    if (evolutionData.chain.evolves_to.length > 0) {
        let evolution2 = {
            name: evolutionData.chain.evolves_to[0].species.name,
            image: await getPokemonImage(evolutionData.chain.evolves_to[0].species.name),
            imageshinny: await getPokemonImageShinny(evolutionData.chain.evolves_to[0].species.name)
        };
        evolutionStages.push(evolution2);
    }
}

async function getEvolution3(evolutionData, evolutionStages) {
    if (evolutionData.chain.evolves_to.length > 0 && evolutionData.chain.evolves_to[0].evolves_to.length > 0) {
        let evolution3 = {
            name: evolutionData.chain.evolves_to[0].evolves_to[0].species.name,
            image: await getPokemonImage(evolutionData.chain.evolves_to[0].evolves_to[0].species.name),
            imageshinny: await getPokemonImageShinny(evolutionData.chain.evolves_to[0].evolves_to[0].species.name)
        };
        evolutionStages.push(evolution3);
    }
}