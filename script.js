// const getPokemon = async () => {
//     let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/`)
//     console.log(pokemon.data)
// }

// getPokemon()






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

// console.log(button, pokemonName, pokemonImage, inputBar)

button.addEventListener('click', async () => {
    let pokemon = inputBar.value.toLowerCase()
    console.log(pokemon) 

    // Collects Pokemon API data

    let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    console.log(response) 

    // Collects Pokemon API species data, I only use this for flavor text

    let speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}/`)
    console.log(speciesResponse)

    // 

    let pokePic = response.data.sprites.front_default

    pokemonImage.setAttribute ('src', pokePic)

    let flavorTextArray = speciesResponse.data.flavor_text_entries

    // Setting text content

    pokemonName.textContent = `Name: ${response.data.name}`
    headerElement.textContent = `${response.data.name}`
    PokemonID.textContent = `ID: ${response.data.id}`
    PokeHeight.textContent = `Height: ${response.data.height}`
    PokeWeight.textContent = `Weight: ${response.data.weight}`
    pokeBio.textContent = flavorTextArray[1].flavor_text

    // Prints one or two types depending on if pokemon has one or two types

    let typesArray = response.data.types
    pokeTypes.textContent = 'Type(s): '
    let typesAlone = ''

    for (typeObject of typesArray) {
        pokeTypes.append(`[${typeObject.type.name}] `)
        typesAlone += `${typeObject.type.name} `
    }

    console.log(pokePic)
    
    pokeBlurb.textContent = `${response.data.name} is a ${typesAlone} type Pokemon that is ${response.data.height} tall and weighs ${response.data.weight}`
})

bgButton.addEventListener('click', () => {
    pokemonImage.classList.toggle('gen5-bg')
    pokemonImage.classList.toggle('pokeball-bg')
    document.body.classList.toggle('pokeball-bg')
    document.body.classList.toggle('gen5-bg')
})

/* Switch Pokemon image from sprite to official art and back, Come back to later  */

// pokemonImage.addEventListener('click', async () => {
//     let pokemon = inputBar.value
//     let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
//     if (pokePic === response.data.sprites.front_default) {
//         pokePic = response.data.sprites.other.officialartwork.front_default
//     } else {
//         pokePic = response.data.sprites.front_default
//     }
//     pokemonImage.setAttribute ('src', pokePic)
// })