'use strict'

function HornedAnimal(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.horns = obj.horns;
  this.keyword = obj.keyword;
  this.description = obj.description;

	allAnimals.push(this);
	allKeywords.push(this.keyword);
}

const allAnimals = [];
const allKeywords =[];
console.log(allKeywords);

HornedAnimal.prototype.render = function() {
  $('main').append('<section class="clone"><section>');
  let $clone = $('section[class="clone"]');

  let animalTemplate = $('#photo-template').html();

  $clone.html(animalTemplate);

  $clone.find('h2').text(this.title);
  $clone.find('p').text(this.description);
  $clone.find('img').attr('src', this.image_url);

  $clone.removeClass('clone');
  $clone.attr('class', this.name);
}

HornedAnimal.prototype.selectByKeyword = function() {

// loop through the array
// pick the keyword of each obj
// append keyword to the select element
// render only those images to the page or hide all other images
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
      })
    })
}

$(() => readJson());

console.log(allAnimals);
