function getTemplatePokemon(Pokemon) {
    return `
        <div class="card pokemon-card ${Pokemon.types[0].type.name}" onclick="openModal('${Pokemon.name}')">
            <img src="${Pokemon.sprites.front_default}" class="card-img-top" alt="${Pokemon.name}">
            <div class="card-body">
                <p class="card-number">N°${Pokemon.id}</p>
                <h5 class="card-title">${Pokemon.name}</h5>
                <div class="pokemon-types">${getTemplatePokemonTypes(Pokemon.types)}</div>
            </div>
        </div>
    `;
}

async function modalPokemon(data) {
    return `
        <div class="modal-header">
            <h5 class="modal-title">${data.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="modal-body">
            ${await getTemplatePokemonModal(data)}
        </div>
        <div class="modal-footer bg-white justify-content-between border-top-0">
            <button class="btn btn-outline-dark rounded-circle" onclick="goToPrevious(${data.id})">←</button>
            <button class="btn btn-outline-dark rounded-circle next" onclick="goToNext(${data.id})">→</button>
        </div>
    `;
}


async function getTemplatePokemonModal(data) {
    return `
    <div class="text-center">${getTemplatePokemonHeader(data)}</div>
    <div class="pokemon-types text-center mb-3">${getTemplatePokemonTypes(data.types)}</div>
    <ul class="nav nav-tabs" id="pokemonTabs">${getTemplatePokemonNav()}</ul>
    <div class="tab-content mt-3">${await getTemplatePokemonTabs(data)}</div>
    `;
}

function getTemplatePokemonHeader(data) {
    return `
        <img src="${data.sprites.front_default}"  class="img-fluid" alt="${data.name}">
        <p>N°${data.id}</p>
    `;
}

function getTemplatePokemonTypes(Types) {
    return Types.map(type => {
        return `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`;
    })
        .join('');
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

async function getTemplatePokemonTabs(data) {
    return `
        <div class="tab-pane fade show active" id="about">${getTemplatePokemonAbout(data)}</div>
        <div class="tab-pane fade" id="stats">${getTemplatePokemonStats(data)}</div>
        <div class="tab-pane fade" id="evolution">${await getTemplatePokemonEvolution(data)}</div>
    `;
}

function getTemplatePokemonAbout(data) {
    return `
            <p><strong>Height:</strong> <span>${data.height}</span></p>
            <p><strong>Weight:</strong> <span>${data.weight}</span></p>
            <p><strong>Abilities:</strong> <span>${getPokemonAbilities(data)}</span></p>
    `;
}

function getTemplatePokemonStats(data) {
    return data.stats.map(stat => {
        return `
            <div class="mb-2">
                <div class="d-flex justify-content-between mb-1">
                    <span class="stat-label">${stat.stat.name}</span>
                    <span class="stat-value">${stat.base_stat}</span>
                </div>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${stat.base_stat}%;"></div>
                </div>
            </div>
        `;
    }).join("");
}

async function getTemplatePokemonEvolution(data) {
    let evolutionStages = await getAllEvolutions(data);
    return `
        <div class="evolution-stages">
            ${evolutionStages.map(stage => {
        return `<div onclick="openModal('${stage.Name}')" class="evolution-stage">
                    <img src="${stage.Imagem}" class="img-fluid normal-img" alt="${stage.Name}">
                    <img src="${stage.ImagemShinny}" class="img-fluid shiny-img" alt="${stage.Name}">
                    <h5>${stage.Name}</h5>
                </div>
                `;
    }).join("↓")}
        </div>
    `;
}