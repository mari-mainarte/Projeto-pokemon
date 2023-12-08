const POKURL = 'https://pokeapi.co/api/v2/pokemon/'

let pokedex = []
    fetch(POKURL + "?limit=251").then( (response) => {
        if(response.status == 200){
            pokedex = response.json().then( (api) => {
                console.log(api.results)
                api.results.map((pokLi) => {
                    let pokemonLi = document.createElement("li")
                    let pokemonImg = document.createElement("img")
                    let pokemonName = document.createElement("h4")
                    let idPokemon = document.createElement("h5")
                    let pokbtn = document.createElement("button")
                    let detalhes = document.createElement("button")
                    let a = document.createElement("a")
                    fetch(pokLi.url).then( pokInfo => { pokeIcon = pokInfo.json().then( (pokImg) => {(pokemonImg.src = pokImg['sprites']['front_default'])})})
                    fetch(pokLi.url).then( pokId => { pokeId = pokId.json().then( (id_pok) => {(idPokemon.innerHTML = "Nº " + id_pok['id'])})})
                    fetch(pokLi.url).then( pokId => { pokeId = pokId.json().then( (id_pok) => {
                        (pokbtn.value = id_pok['id']) 
                        return id_pok
                        })
                        return pokId
                    })
                    fetch(pokLi.url).then( pokId => { pokeId = pokId.json().then( (id_pok) => {(detalhes.value = id_pok['id'])})})
                    a.href = "#pok_modal"
                    pokbtn.id = 'pokbtn'
                    pokemonName.innerHTML = pokLi.name
                    pokemonLi.id = 'liPok'
                    detalhes.id = 'pok_details'
                    pokbtn.innerHTML = 
                    `
                        <img src="pokebolla.png" id="pokball">
                    `
                    detalhes.innerHTML = 
                    `
                        Info+
                    `
                    pokbtn.addEventListener("click", capturarPokemons)
                    pokemonImg.id = 'pokImg'
                    detalhes.addEventListener("click", showModal)

                    pokemonLi.appendChild(pokbtn)
                    pokemonLi.appendChild(pokemonImg)
                    pokemonLi.appendChild(idPokemon)
                    pokemonLi.appendChild(pokemonName)
                    pokemonLi.appendChild(a)
                    a.appendChild(detalhes)
                    document.getElementById("pokedexList").appendChild(pokemonLi)
                    return pokLi
                })
                return api
            })
            return pokedex
        }
        console.log(pokedex)
})

function showModalInput(){
    fetch(POKURL + "?limit=251").then( async (response) => {
        if(response.status == 200){
            let pokemonGif = document.getElementById("pokGif")
            let pokemonName = document.getElementById("nomePokemon")
            let pokemonId = document.getElementById("idPokemon")
            let pokemonH = document.getElementById("alturaPokemon")
            let pokemonP = document.getElementById("pesoPokemon")
            let pokemonType = document.getElementById("type")
            let pokemonText = document.getElementById("text")
            let pokemonIcon = document.createElement("img")
            let input = document.getElementById("input").value
            pokemonId.innerHTML = ""
            pokemonGif.src = " "
            const list_pok = response.json().then( async (api) => {
                const result = api.results
                if(input<1 || input>251 ){
                    pokemonName.innerHTML = "Não encontrado!"
                    pokemonH.innerHTML = ""
                    pokemonP.innerHTML = ""
                    pokemonType.innerHTML = ""
                    pokemonType2.innerHTML = ""
                    pokemonText.innerHTML = ""
                }else{
                    await fetch(result[input-1]['url']).then( response => {
                        response.json().then( pokInfo => {
                            pokemonId.innerHTML = "Nº" + pokInfo.id 
                            pokemonName.innerHTML = "Nome: " + pokInfo.name
                            pokemonGif.src = pokInfo['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
                            pokemonType.innerHTML = pokInfo['types']['name']
                            pokemonH.innerHTML = "Altura: " + pokInfo.height + "cm"
                            pokemonP.innerHTML = "Peso: " + pokInfo.weight + "g"
                            if(pokemonGif.src == "null"){
                                pokemonGif.src = pokInfo['sprites']['front_default']
                            }
                        })
                    })
                    await fetch(result[input-1]['url']).then( response => {
                        response.json().then( pokInfo => {
                            pokemonType.innerHTML = "Tipo: " + pokInfo['types']['0']['type']['name']
                        })
                    })
                    await fetch(result[input-1]['url']).then( response => {
                        response.json().then( pokInfo => {
                            fetch(pokInfo['species']['url']).then( poktext => {
                                poktext.json().then( ptxt => {
                                    pokemonText.innerHTML = ptxt['flavor_text_entries']['0']['flavor_text']
                                })
                            })
                        })
                    })
                    await fetch(api['results'][input-1]['url']).then( response => {
                        response.json().then( pokInfo => {
                            pokemonIcon.src = pokInfo['sprites']['versions']['generation-vii']['icons']['front_default']
                        })
                    })
                }
            })
        }
    })
}

function showModal(){
    fetch(POKURL + "?limit=251").then( async (response) => {
        if(response.status == 200){
            let btn = detalhes.value
            let pokemonGif = document.getElementById("pokGif")
            let pokemonName = document.getElementById("nomePokemon")
            let pokemonId = document.getElementById("idPokemon")
            let pokemonH = document.getElementById("alturaPokemon")
            let pokemonP = document.getElementById("pesoPokemon")
            let pokemonType = document.getElementById("type")
            let pokemonText = document.getElementById("text")
            let pokemonIcon = document.createElement("img")
            pokemonId.innerHTML = ""
            pokemonGif.src = " "

            const list_pok = response.json().then( async (api) => {
                const result = api.results
                    await fetch(result[btn-1]).then( response => {
                        response.json().then( pokInfo => {
                            pokemonId.innerHTML = "Nº" + pokInfo.id 
                            pokemonName.innerHTML = pokInfo.name
                            pokemonGif.src = pokInfo['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
                            pokemonType.innerHTML = pokInfo['types']['name']
                            pokemonH.innerHTML = "Altura: " + pokInfo.height
                            pokemonP.innerHTML = "Peso: " + pokInfo.weight
                            if(pokemonGif.src == "null"){
                                pokemonGif.src = pokInfo['sprites']['front_default']
                            }
                        })
                    })
                    await fetch(result[btn-1]['url']).then( response => {
                        response.json().then( pokInfo => {
                            pokemonType.innerHTML = pokInfo['types']['0']['type']['name']
                        })
                    })
                    await fetch(result[btn-1]['url']).then( response => {
                        response.json().then( pokInfo => {
                            fetch(pokInfo['species']['url']).then( poktext => {
                                poktext.json().then( ptxt => {
                                    pokemonText.innerHTML = ptxt['flavor_text_entries']['0']['flavor_text']
                                })
                            })
                        })
                    })
                    await fetch(api['results'][btn-1]['url']).then( response => {
                        response.json().then( pokInfo => {
                            pokemonIcon.src = pokInfo['sprites']['versions']['generation-vii']['icons']['front_default']
                        })
                    })
                })
            }
    })
}

let cont = 0

function capturarPokemonsInput(){
    fetch(POKURL + "?limit=251").then( async (response) => {
        if(response.status == 200){
            let input = document.getElementById("input").value
            let pokLi = document.createElement("li")
            let pokemonIcon = document.createElement("img")
            let pokName = document.createElement("h5")
            response.json().then( async (api) => {
                if(input<1 || input>251 ){
                    alert("Tente novamente!")
                }else{
                    if(cont >= 6){
                        alert("Voçê já tem o time completo!")
                    }else{
                        await fetch(api['results'][input-1]['url']).then( response => {
                            response.json().then( pokInfo => {
                                pokemonIcon.src = pokInfo['sprites']['versions']['generation-vii']['icons']['front_default']
                                pokName.innerHTML = pokInfo.name
                            })
                        })
                        pokName.id = 'nome_pok'
                        pokemonIcon.id = 'pokIcon'
                        pokLi.appendChild(pokemonIcon)
                        pokLi.appendChild(pokName)
                        document.getElementById("capturados").appendChild(pokLi)
                        cont++
                    }
                }
            })
        }
    })
}
function capturarPokemons(){
    fetch(POKURL + "?limit=251").then( async (response) => {
        if(response.status == 200){
            let pokemonBtn = pokbtn.value
            let pokLi = document.createElement("li")
            let pokemonIcon = document.createElement("img")
            let pokName = document.createElement("h5")
            response.json().then( async (api) => {
                    if(cont >= 6){
                        alert("Voçê já tem o time completo!")
                    }else{
                        let result = api.results
                        await fetch(result[pokemonBtn-1]).then( response => {
                            response.json().then( pokInfo => {
                                pokemonIcon.src = pokInfo['url']['sprites']['versions']['generation-vii']['icons']['front_default']
                                pokName.innerHTML = pokInfo.name
                            })
                        })
                        pokName.id = 'nome_pok'
                        pokemonIcon.id = 'pokIcon'
                        pokLi.appendChild(pokemonIcon)
                        pokLi.appendChild(pokName)
                        document.getElementById("capturados").appendChild(pokLi)
                        cont++
                    }
            })
        }
    })
}

function soltarPokemon(btn){
    
}