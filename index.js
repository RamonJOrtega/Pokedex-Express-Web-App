const db = require('./database.js')
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const { name } = require('ejs');
app.use(express.static(__dirname + '/public/css'));
app.use(expressLayouts);
app.set('layout', './layouts/full-width');
app.set('view engine', 'ejs');

const port = 8001;

const axiosGet = async (url) => {
    console.log('The URL call is \n', url);
    try {
        const response = await axios.get(url);
        return response.data;
    }
        catch (err) { 
            console.log("Axios Error: " + err);     
        }
}

app.get('/', async (request, response) => {
    const pokeCount = 150;
    const generalURL = `https://pokeapi.co/api/v2/pokemon?limit=${pokeCount}`;
    const apiResponse = await axiosGet(generalURL);
    const namesAndURLs = apiResponse.results;
    let namesAndPicsArray = []; //fill up a 2D array. //each row is 1 name and 1 picture
    for(let index = 0; index<namesAndURLs.length; index++){
        let name = namesAndURLs[index]?.name;
        let specificURL = namesAndURLs[index]?.url;
        console.log(namesAndURLs[index]?.url);
        let apiResponse = await axiosGet(specificURL);
        let pokePic = apiResponse.sprites.front_shiny;
        namesAndPicsArray[index]=[name, pokePic];
        // let inputRecordCommand = 
        // `INSERT INTO pokemon (name, imageurl) 
        // VALUES ('${name}', '${pokePic}')
        // ON CONFLICT DO NOTHING;`
        // db.giveMeString(inputRecordCommand)
        // await db.executeQuery(inputRecordCommand).then(result => {
        // if (result) {
        //     console.log('query success');
        // }
        // })      
    }
    response.render('pokemonHome', {
        title: 'Scroll down or select Pokemon Number from Above',
        pokemon: namesAndPicsArray,
        pokeCount: pokeCount
        });
    });     

app.get('/sam', (request, response) => {
    response.render('sam', {title: 'Sam' });
});

app.get('/myPokemon', (request, response) => {
    response.render('myPokemon', {title: 'My Pokemon' });
});

app.get('/number/:int', async (request, response) => {
    const pokeNum = request.params.int;
    const specificURL = `https://pokeapi.co/api/v2/pokemon/${pokeNum}`;
    const apiResponsePoke = await axiosGet(specificURL);
    const pokemonName = apiResponsePoke.forms[0].name;  
    const imageURL = apiResponsePoke.sprites.front_shiny;
    const height = apiResponsePoke.height;
    const weight = apiResponsePoke.weight;
    const speciesURL = apiResponsePoke.species.url;
    const apiResponseSpecies = await axiosGet(speciesURL);
    blurb = apiResponseSpecies.flavor_text_entries[0].flavor_text;
    response.render('number', {
    title: pokeNum, 
    pokemon:pokemonName,
    image:imageURL,
    height: height,
    weight: weight,
    speciesURL: speciesURL,
    blurb: blurb
    });

});

const createBigTableCommand = 'CREATE TABLE IF NOT EXISTS pokemon (number serial PRIMARY KEY, name VARCHAR (255) UNIQUE NOT NULL, imageURL VARCHAR (255) UNIQUE NOT NULL, height VARCHAR (255) UNIQUE NOT NULL, weight VARCHAR (255) UNIQUE NOT NULL, speciesURL VARCHAR (255) UNIQUE NOT NULL, blurb VARCHAR (255) UNIQUE NOT NULL);'
const createSmallTableCommand = 'CREATE TABLE IF NOT EXISTS pokemonNumberNameSprite (number serial PRIMARY KEY, name VARCHAR (255) UNIQUE NOT NULL, imageURL VARCHAR (255) UNIQUE NOT NULL);'
const getDBrecordsCommand = 'Select * from pokemon'


app.listen(port, () => {
    console.log(`listening to the smooth sounds of port ${port}`);
})