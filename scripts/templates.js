function getTemplatePokemon(iPoke) {
    return `
        <div class="card pokemon-card ${PokemonList[iPoke].types[0].type}" data-id="${PokemonList[iPoke].id}" onclick="creatModal(${PokemonList[iPoke].id})">
            <img src="${PokemonList[iPoke].sprites.front_default}" class="card-img-top" alt="${PokemonList[iPoke].name}">
            <div class="card-body">
                <p class="card-number">N°${PokemonList[iPoke].id}</p>
                <h5 class="card-title">${PokemonList[iPoke].name}</h5>
                <div class="pokemon-types">${getTemplatePokemonTypes(PokemonList[iPoke].types)}</div>
            </div>
        </div>
    `;
}

function getTemplatePokemonTypes(Types) {
    return Types.map(type => {
        return `<span class="type-badge type-${type.type}">${type.type}</span>`;
    })
        .join('');
}

function modalPokemon(iPoke) {
    return `
        <div class="modal-body" id="modal-body">${getTemplatePokemonModal(iPoke)}
        </div>
    `
}

function getTemplatePokemonModal(iPoke) {
    return `
    <div class="text-center">${getTemplatePokemonHeader(iPoke)}</div>
    <div class="pokemon-types text-center mb-3">${getTemplatePokemonTypes(PokemonList[iPoke].types)}</div>
    <ul class="nav nav-tabs" id="pokemonTabs">${getTemplatePokemonNav()}</ul>
    <div class="tab-content mt-3">${getTemplatePokemonTabs(iPoke)}</div>
    <div class="modal-footer bg-white justify-content-between border-top-0">
        <button class="btn btn-outline-dark rounded-circle" onclick="goToPrevious(${PokemonList[iPoke].id})">←</button>
        <button class="btn btn-outline-dark rounded-circle next" onclick="goToNext(${PokemonList[iPoke].id})">→</button>
    </div>
    `;
}

function getTemplatePokemonNav() {
    return `
            <li class="nav-item">
                <a class="nav-link active" id="about-tab" data-bs-toggle="tab" href="#about">About</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="stats-tab" data-bs-toggle="tab" href="#stats">Stats</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="evolution-tab" data-bs-toggle="tab" href="#evolution">Evolution</a>
            </li>
    `
}

function getTemplatePokemonTabs(iPoke) {
    return `
        <div class="tab-pane fade show active" id="about">${getTemplatePokemonAbout(iPoke)}</div>
        <div class="tab-pane fade" id="stats">${getTemplatePokemonStats(iPoke)}</div>
        <div class="tab-pane fade" id="evolution">${getTemplatePokemonEvolution(iPoke)}</div>
    `;
}

function getTemplatePokemonAbout(iPoke) {
    return `
            <p><strong>Height:</strong> <span>${PokemonList[iPoke].height}</span></p>
            <p><strong>Weight:</strong> <span>${PokemonList[iPoke].weight}</span></p>
            <p><strong>Abilities:</strong> <span>${PokemonList[iPoke].abilities}</span></p>
    `;
}

function getTemplatePokemonStats(iPoke) {
    return PokemonList[iPoke].stats.map(stat => {
        return `
            <div class="mb-2">
                <div class="d-flex justify-content-between mb-1">
                    <span class="stat-label">${stat.name}</span>
                    <span class="stat-value">${stat.base_stat}</span>
                </div>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${stat.base_stat}%;"></div>
                </div>
            </div>
        `;
    }).join("");
}

function getTemplatePokemonEvolution(iPoke) {
    return `
        <div class="evolution-stages">
            ${PokemonList[iPoke].species.map(stage => {
        return `<div onclick="updateModal('${stage.Name}')" class="evolution-stage">
                    <img src="${stage.Imagem}" class="img-fluid normal-img" alt="${stage.Name}">
                    <img src="${stage.ImagemShinny}" class="img-fluid shiny-img" alt="${stage.Name}">
                    <h5>${stage.Name}</h5>
                </div>
                `;
    }).join("↓")}
        </div>
    `;
}

function getTemplatePokemonHeader(iPoke) {
    return `
        <img src="${PokemonList[iPoke].sprites.front_default}"  class="img-fluid" alt="${PokemonList[iPoke].name}">
        <h5>${PokemonList[iPoke].name}</h5>
        <p>N°${PokemonList[iPoke].id}</p>
    `;
}