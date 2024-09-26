/* HTML elements */

const button = document.querySelector("#fetch-button")
const bgButton = document.querySelector("#background-button")
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

    // Sets Pokemon picture

    let pokePic = response.data.sprites.front_default
    pokemonImage.setAttribute ('src', pokePic)
    pokemonImage.setAttribute ('alt', pokemon) // Allows me to swap to official art and other sprites should I choose

    let trueHeight = response.data.height *= 10
    let trueWeight = response.data.weight /= 10

    // Setting text content above flavor text

    pokemonName.textContent = `${response.data.name}`
    headerElement.textContent = `${response.data.name}`
    PokemonID.textContent = `# ${response.data.id}`
    PokeHeight.textContent = `Height: ${trueHeight} cm`
    PokeWeight.textContent = `Weight: ${trueWeight} kg`

    // Prints one or two types depending on if pokemon has one or two types

    let typesArray = response.data.types
    pokeTypes.textContent = 'Type(s): '
    let typesAlone = ''

    for (typeObject of typesArray) {
        pokeTypes.append(`[${typeObject.type.name}] `)
        typesAlone += `${typeObject.type.name} `
    }


    
    pokeBlurb.textContent = `${response.data.name.toUpperCase()} is a ${typesAlone} type Pokemon that 
    is ${trueHeight}cm tall and weighs ${trueWeight}kg`

    // Sets flavor text
    let flavorTextArray = speciesResponse.data.flavor_text_entries
    
    pokeBio.textContent = flavorTextArray[1].flavor_text

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