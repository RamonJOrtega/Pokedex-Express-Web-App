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

// app.get('/', async (request, response) => {
//     const apiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5');
//     const json = await apiResponse;
//     console.log(json);
//     response.render('helloWorld', {title: 'Home', text: 'This is an express app!'});
// });
namesAndPicsArray = [["n1,", "p1"]]; 

app.get('/', async (request, response) => {
        const generalURL = 'https://pokeapi.co/api/v2/pokemon?limit=9';
        const apiResponse = await axios.get(generalURL);
        const namesAndURLs = apiResponse.data.results;
        console.log(namesAndURLs[0].name);
        //namesAndPicsArray = [["n1,", "p1"]]; //fill up a 2D array.
        //each row is 1 name and 1 picture
        for(let index = 0; index<namesAndURLs.length; index++){
            let name = namesAndURLs[index]?.name;
            let specificURL = namesAndURLs[index]?.url;
            console.log(namesAndURLs[index]?.url);
            let apiResponse = await axios.get(specificURL);
            let pokePic = apiResponse.data.sprites.front_shiny;
            namesAndPicsArray[index]=[name, pokePic];
        }
        console.log(namesAndURLs);
        response.render('pokemonHome', {
            title: 'Scroll down or select Pokemon Number from Above',
            pokemon: namesAndPicsArray
            });
    });     

app.get('/sam', (request, response) => {
    response.render('sam', {title: 'Sam' });
});

app.get('/number/:int', (request, response) => {
    const myNumber = request.params.int;
    response.render('number', {title: myNumber, number:myNumber},)
});

app.listen(port, () => {
    console.log(`listening to the smooth sounds of port ${port}`);
});

// if (typeof Window !== "undefined") {
//     Window.onscroll = function() {myFunction()};
// }

// function myFunction() {
//     if (document.documentElement.scrollTop > 10) {
//       document.getElementById("myP").className = "test";
//     } else {
//       document.getElementById("myP").className = "";
//     }
//   }