const POKURL ='https://pokeapi.co/api/v2/pokemon/'

function getPokemonList(){
    let pokemonsList = []
    fetch(POKURL + '?limit=6').then( response => {
        if(response.status == 200){
            pokemonsList = response.json().then( json => {
            json.results.map( pokemon => { 
                    let liPokemon = document.createElement("li")
                    let liPokemonImg = document.createElement("img")
                    fetch(pokemon.url).then( response => { pokemonImg = response.json().then( (pokemon) => {(liPokemonImg.src = pokemon.sprites.front_default)})})
                    liPokemon.innerHTML = pokemon.name
                    liPokemon.appendChild(liPokemonImg)
                    document.getElementById("listaPokemon").appendChild(liPokemon)
                 })
                return json
            })
            return pokemonsList
        }
    })
}