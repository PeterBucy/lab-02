'use strict';
//-----Global Variables------

let allAnimals = [];
let allKeywords = [];

//----Object Constructor-----
function HornedAnimal(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.horns = obj.horns;
  this.keyword = obj.keyword;
  this.description = obj.description;
  allAnimals.push(this);
}

HornedAnimal.prototype.render = function () {
  let templateHtml = $('#handlebars').html()   // 1. Get the template from the HTML document
  let photoTemplate = Handlebars.compile(templateHtml);  // 2. Use Handlebars to "compile" the HTML
  let newHornedAnimal = photoTemplate(this);  // 3. Do not forget to return the HTML from this method
  console.log('render');
  return newHornedAnimal;
};

HornedAnimal.prototype.selectByKeyword = function () {
  allAnimals.forEach((animalObj) => { // for each new horned animal object instance, do the following...
    if (!allKeywords.includes(animalObj.keyword)) { // check each keyword against any in the keyword array, to eliminate duplicates
      allKeywords.push(animalObj.keyword); //if the keyword is not in the array already, add it
      $('#default-option').after(`<option value = "${animalObj.keyword}" class = "words">${animalObj.keyword}</option>`); //find the first option of the dropdown filter, and add each keyword as a new item
    }
  })
}

//----sort button functions-----
let sortByTitle = () => {
  allAnimals.sort(function (a, b) { 
    if(a.title < b.title) return -1;
    if(a.title > b.title) return 1;
    return 0;
  })
};

let sortByHorns = () => {
  allAnimals.sort(function(a, b){
    if(a.horns < b.horns) return -1;
    if(a.horns > b.horns) return 1;
    return 0;
  })
};

//----functions to read/render json files----
function readJson() {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      data.forEach(newHornedAnimalObj => {
        new HornedAnimal(newHornedAnimalObj);
      })
    })
    .then(() => {
      allAnimals.forEach(animal => {
        $('main').append(animal.render());
        animal.selectByKeyword();
      })
    })
}

function readJson2() {
  $.get('./data/page-2.json', 'json')
    .then(data => {
      data.forEach(newHornedAnimalObj => {
        new HornedAnimal(newHornedAnimalObj);
      })
    })
    .then(() => {
      allAnimals.forEach(animal => {
        $('main').append(animal.render());
        animal.selectByKeyword();
      })
    })
}

// --- shortened read-json function to render newly sorted objects
function readJson3(){
  allAnimals.forEach(animal => {
    $('main').append(animal.render());
    animal.selectByKeyword();
  })
}

//---Navigation----
//Keyword Selection
$('select').on('change', function () {
  let $selection = $(this).val();
  if ($selection === 'default') {
    $('div').show();
    return;
  }
  $('div').hide();
  $(`div[class = "${$selection}"]`).show();
});

//-----Click Handlers for page-changing buttons
//Button 1: reads page-1.json
$('#button1').on('click', function () {
  $('.words').remove();
  $('main').empty()
  $(() => readJson());

  allAnimals = [];
  allKeywords = [];
})

//Button 2: reads page-2.json
$('#button2').on('click', function () {
  $('.words').remove();
  $('main').empty()
  $(() => readJson2());
  allAnimals = [];
  allKeywords = [];
})

// ---Sort Button Handlers
//Sort by Horns
$('#sort').on('click',function(){
  $('main').empty();
  sortByHorns();
  readJson3();
})

// Sort by Title
$('#sort2').on('click',function(allAnimals){
  $('main').empty();
  sortByTitle(allAnimals);
  readJson3();
})

// ---Ready Function---
$(() => readJson());
