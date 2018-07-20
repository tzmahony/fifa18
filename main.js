console.log('hello tian');

let currentPage = 'teams';


function setCurrentPage(page) {
    currentPage = page;
    let contentChildDiv = document.getElementById('child-content');
    contentChildDiv.parentNode.removeChild(contentChildDiv);

    onPageLoad();
}

function onPageLoad() {
    console.log('onPageLoad, current page:', currentPage);

    let pokemonPromise = loadPokemon();
    pokemonPromise.then(function(result) {
        console.log('pokemon json:', result);
        let pokemonResults = result.results;
        console.log('pokemon results:', pokemonResults);

        let pokemon0 = result.results[0];
        console.log('pokemon 0:', pokemon0);
        console.log('pokemon 0 name:', pokemon0.name);

        let pokemon1 = result.results[1];
        console.log('pokemon 1:', pokemon1);
        console.log('pokemon 1 name:', pokemon1.name);

        // etc
    });

    let contentDiv = document.getElementById('content');
    console.log('ContentDiv:', contentDiv)

    if (currentPage === 'teams') {
        let markup = generateContent('Teams', 'countries');
        console.log('markup:', markup);

        let elChild = document.createElement('div');
        elChild.setAttribute('id', 'child-content');
        elChild.innerHTML = markup;
        contentDiv.appendChild(elChild);

        loadTeams();
    } else if (currentPage === 'stadiums') {
        let markup = generateContent('Stadiums', 'stadiums');

        let elChild = document.createElement('div');
        elChild.setAttribute('id', 'child-content');
        elChild.innerHTML = markup;
        contentDiv.appendChild(elChild);

        loadStadiums();
    }
    else if (currentPage === 'channels') {
        let markup = generateContent('Tv channels', 'tvchannels');

        let elChild = document.createElement('div');
        elChild.setAttribute('id', 'child-content');
        elChild.innerHTML = markup;
        contentDiv.appendChild(elChild);

        loadChannels();
    }
}

function generateContent(header, contentId) {
    let markup = `
        <h2>${ header }</h2>
        <div id="${ contentId }"></div>
        `;
    return markup;
}

function load() {
    return fetch('https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json', {
        method: 'get'
    }).then(function (response) {
        return response.json();
    });
}

function loadPokemon() {
    return fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20', {
        method: 'get'
    }).then(function (response) {
        return response.json();
    });
}

function loadTeams() {
    load().then((j) => renderCountries(j));
}


function loadStadiums() {
    load().then((j) => renderStadiums(j));
}


function loadChannels() {
    load().then((j) => renderTvchannels(j));
}


function renderCountries(json) {
    console.log("in render countries:" + json.teams[0].name);

    var parentDiv = document.getElementById("countries");

    for (let team of json.teams) {
        // console.log(value);
        //let team = json.teams[0];

        const markup = `
         <div class="country-box">
            <h3>${ team.name }</h3>
            <img src="${ team.flag }">
        </div>`


        var elChild = document.createElement('div');
        elChild.innerHTML = markup;
        parentDiv.appendChild(elChild);

    }
}

function renderStadiums(json) {
    console.log("in render stadiums:" + json.stadiums[0].name);

    var parentDiv = document.getElementById("stadiums");

    for (var stadium of json.stadiums) {
        console.log("name"+ stadium.name);

        const markup = `
         <div class="stadium-box">
            <h3>${stadium.name}</h3>
        </div>`

        var elChild = document.createElement('div');
        elChild.innerHTML = markup;
        parentDiv.appendChild(elChild);
    }


    }


function renderTvchannels(json) {
    console.log("in render tv channels:" + json.tvchannels[0].name);

    var parentDiv = document.getElementById("tvchannels");

    for (var tvchannel of json.tvchannels) {
        console.log("name" + tvchannel.name);

        const markup = `
        '<div class="tvchannel-box">
        <h3>${tvchannel.name}</h3>
        <h3>${tvchannel.country}</h3>
</div>`

        var elChild = document.createElement('div');
        elChild.innerHTML = markup;
        parentDiv.appendChild(elChild);
    }
}

