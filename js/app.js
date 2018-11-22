'use strict'

function HornedAnimal(obj) {
  this.image_url = obj.image_url;
  this.title = obj.title;
  this.horns = obj.horns;
  this.keyword = obj.keyword;
  this.description = obj.description;

  allAnimals.push(this);
}

const allAnimals = [];

HornedAnimal.prototype.render = function {
	$('main').append('<section class="clone"><section>');
	let $clone = $('section[class="clone"]');

	let animalTemplate = $('#photo-template').html();

	$clone.html(animalTemplate);

	$clone.find('h2').text(this.title);
	$clone.find('p').text(this.description);
	$clone.find('img').attr('src', this.image_url);
	// $clone.find()


}

function readJson() {
  $.get('./data.json', 'json')
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
