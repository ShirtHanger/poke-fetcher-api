/* HTML elements */

const button = document.querySelector("#fetch-button")
const bgButton = document.querySelector("#background-button")
const cryButton = document.querySelector('#cry-button')
const randomButton = document.querySelector('#random-button')
const pokemonName = document.querySelector("#pokemon-name")
const pokemonImage = document.querySelector("#pokemon-image")
const PokemonID = document.querySelector('#pokemon-id')
const inputBar = document.querySelector("#input-bar")
const PokeHeight = document.querySelector('#pokemon-height')
const PokeWeight = document.querySelector('#pokemon-weight')
const pokeTypes = document.querySelector('#pokemon-types')
const pokeBlurb = document.querySelector('#pokemon-description')
const pokeBio = document.querySelector('#flavor-text')
const headerElement = document.querySelector('h1')

/* Event listeners */

button.addEventListener('click', async () => {
    let pokemon = inputBar.value.toLowerCase()
    console.log(pokemon) 

    // Collects Pokemon API data

    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    console.log(response) 

    // Collects Pokemon API species data, I only use this for flavor text

    let speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`)
    console.log(speciesResponse)

    setPokeData(response.data, pokemon)
    setFlavorText(speciesResponse.data)

})

// Swaps Pokemon bubble and background color gradiants between Generation 5 and Pokeball inspired gradiants

bgButton.addEventListener('click', () => {
    pokemonImage.classList.toggle('gen5-bg')
    pokemonImage.classList.toggle('pokeball-bg')
    document.body.classList.toggle('pokeball-bg')
    document.body.classList.toggle('gen5-bg')
})

/* Tried to make a listenter to Switch Pokemon image from sprite to official art  */

pokemonImage.addEventListener('click', async () => {
    let pokemon = pokemonImage.alt
    console.log(pokemon)
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    let pokeArt = response.data.sprites.other['official-artwork'].front_default
    console.log(pokeArt)
    pokemonImage.setAttribute ('src', pokeArt)
})

/* ChatGPT helped clarify line 87 (Line before console logging and setting pokemonArt) for me, */


/* Kept getting errors with 'response.data.sprites.other.official-artwork.front_default' 
I believe it's a syntax problem, fixed by simply calling the specific string */

/* https://chatgpt.com/share/66f4b1e1-02d8-8012-8fb6-7650c50c87b8 */

/* Play Pokemon Cry, to be fixed, currently returns error, claims .play() is not a function */

cryButton.addEventListener('click', async () => {
    let pokemon = pokemonImage.alt
    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    let PokeID = response.data.id
    console.log(pokemon)
    let responseCry = await axios.get(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${PokeID}.ogg`)
    console.log(responseCry)
    responseCry.play()
})

randomButton.addEventListener('click', async () => {

    let maximumPokemon = 1025 /* API doesn't have this for some reason */
    console.log('Total number of pokemon:', maximumPokemon) 
    console.log('=================') 
    randomPokeID = randNum(maximumPokemon)
    console.log('Random Pokemon ID:', randomPokeID)

    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokeID}`)
    console.log(response) 

    // Collects Pokemon API species data, I only use this for flavor text

    let speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${randomPokeID}/`)
    console.log(speciesResponse)

    setPokeData(response.data, randomPokeID)
    setFlavorText(speciesResponse.data)

})

function randNum(maxNum) {
    /* Returns a random number between 0 and the length of given array */
    /* Used for when multiple heroes are returned for search result*/

    randIndex = Math.floor(Math.random() * maxNum) // Copied this from my Pokemon Album Prework, edited for this
    return randIndex
  }

function setPokeData(pokemonDataDrill, pokemonNameOrID) {
    let pokePic = pokemonDataDrill.sprites.front_default
    pokemonImage.setAttribute ('src', pokePic)
    pokemonImage.setAttribute ('alt', pokemonNameOrID) // Allows me to swap to official art and other sprites should I choose

    let trueHeight = pokemonDataDrill.height *= 10
    let trueWeight = pokemonDataDrill.weight /= 10

    // Setting text content above flavor text

    pokemonName.textContent = `${pokemonDataDrill.name}`
    headerElement.textContent = `${pokemonDataDrill.name}`
    PokemonID.textContent = `# ${pokemonDataDrill.id}`
    PokeHeight.textContent = `Height: ${trueHeight} cm`
    PokeWeight.textContent = `Weight: ${trueWeight} kg`

    // Prints one or two types depending on if pokemon has one or two types

    let typesArray = pokemonDataDrill.types
    pokeTypes.textContent = 'Type(s): '
    let typesAlone = ''

    for (typeObject of typesArray) {
        pokeTypes.append(`[${typeObject.type.name}] `)
        typesAlone += `${typeObject.type.name} `
    }


    
    pokeBlurb.textContent = `${pokemonDataDrill.name.toUpperCase()} is a ${typesAlone} type Pokemon that 
    is ${trueHeight}cm tall and weighs ${trueWeight}kg`

}

function setFlavorText(pokemonSpeciesDataDrill) {
    // Sets flavor text
    let flavorTextArray = pokemonSpeciesDataDrill.flavor_text_entries
    
    pokeBio.textContent = flavorTextArray[1].flavor_text
    /* Sets a pokemon's data based on API pull */
}