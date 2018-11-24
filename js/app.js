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
  allKeywords.push(this.keyword);
  
}

console.log(allKeywords);

function makeList(){
  let select = document.getElementById("keyWords")
  var testArray = ["pole", "tree", "thing"]
  for(var i = 0; i < testArray.length; i++) {
    select.add(new Option(testArray[i] ) );
   }

  }
  
  makeList();

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



