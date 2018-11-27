
'use strict'

let allAnimals =[];

let allKeywords =[];


function HornedAnimal(obj) {

  this.image_url = obj.image_url;

  this.title = obj.title;

  this.horns = obj.horns;

  this.keyword = obj.keyword;

  this.description = obj.description;

  allAnimals.push(this);

}


HornedAnimal.prototype.render = function() {
  // 1. Get the template from the HTML document
  let templateHtml = $('#handlebars').html()
  // 2. Use Handlebars to "compile" the HTML
  let photoTemplate = Handlebars.compile(templateHtml);
  // 3. Do not forget to return the HTML from this method
  let newHornedAnimal = photoTemplate(this);
  console.log('render');
  // console.log(newNeighborhood);
  return newHornedAnimal;
};



HornedAnimal.prototype.selectByKeyword = function() {

  allAnimals.forEach( (animalObj) => { // for each new horned animal object instance, do the following...

    if (!allKeywords.includes(animalObj.keyword)) { // check each keyword against any in the keyword array, to eliminate duplicates

      allKeywords.push(animalObj.keyword); //if the keyword is not in the array already, add it

      // console.log(allKeywords);

      $('#default-option').after(`<option value = "${animalObj.keyword}" class = "words">${animalObj.keyword}</option>`); //find the first option of the dropdown filter, and add each keyword as a new item

    }

  })

}



function readJson() {

  $.get('./data/page-1.json', 'json')

    .then( data => {

      data.forEach( newHornedAnimalObj => {

        new HornedAnimal( newHornedAnimalObj);

      })

    })

    .then( () => {

      allAnimals.forEach( animal =>{
        $('#photo-template').append(animal.render());

        animal.selectByKeyword();

        allAnimals = [];

        allKeywords = [];

      })

    })

}


function readJson2() {

  $.get('./data/page-2.json', 'json')

    .then( data => {

      data.forEach( newHornedAnimalObj => {

        new HornedAnimal( newHornedAnimalObj);

      })

    })

    .then( () => {

      allAnimals.forEach( animal =>{
 
        $('#photo-template').append(animal.render());
        animal.selectByKeyword();
        allAnimals = [];

        allKeywords = [];

      })

    })

}

$('select').on('change', function () {

  let $selection = $(this).val();
  if($selection === 'default') {

    $('div').show();

    return;

  }

  $('section').hide();

  $(`section[class = "${$selection}"]`).show();
});

//Click Function for Button to change pages

$('#button1').on('click',function(){

  $('section').remove();

  $('.words').remove();

  $(() => readJson());

})



//Click Handler for Button 2

$('#button2').on('click',function(){

  $('section').remove();

  $('.words').remove();

  $(() => readJson2());

})



$(() => readJson());
