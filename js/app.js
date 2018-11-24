'use strict'
const allAnimals =[];
const allKeywords =[];
const newAnimal = [];

function HornedAnimal(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.horns = obj.horns;
  this.keyword = obj.keyword;
  this.description = obj.description;

  allAnimals.push(this);
}

HornedAnimal.prototype.render = function() {
  $('main').append('<section class="clone"><section>');
  let $clone = $('section[class="clone"]');

  let animalTemplate = $('#photo-template').html();

  $clone.html(animalTemplate);

  $clone.find('h2').text(this.title);
  $clone.find('p').text(this.description);
  $clone.find('img').attr('src', this.image_url);

  $clone.removeClass('clone');
  $clone.attr('class', this.keyword);
}

HornedAnimal.prototype.selectByKeyword = function() {
  allAnimals.forEach( (animalObj) => { // for each new horned animal object instance, do the following...
    if (!allKeywords.includes(animalObj.keyword)) { // check each keyword against any in the keyword array, to eliminate duplicates
      allKeywords.push(animalObj.keyword); //if the keyword is not in the array already, add it
      console.log(allKeywords); 
      $('#default-option').after(`<option value = "${animalObj.keyword}">${animalObj.keyword}</option>`); //find the first option of the dropdown filter, and add each keyword as a new item
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
        animal.render();
        animal.selectByKeyword();
      })
    })
}

$('select').on('change', function () {
  let $selection = $(this).val();

  if($selection === 'default') {
    $('section').show();
    return;
  }

  $('section').hide();
  $(`section[class = "${$selection}"]`).show();
});

$(() => readJson());
