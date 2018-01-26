const petsData = [
  {
    name: "Purrsloud",
    species: "Cat",
    favFoods: ["wet food", "dry food", "<strong>any</strong> food"],
    birthYear: 2018,
    photo: "https://learnwebcode.github.io/json-example/images/cat-2.jpg"
  },
  {
    name: "Barksalot",
    species: "Dog",
    birthYear: 2017,
    photo: "https://learnwebcode.github.io/json-example/images/dog-1.jpg"
  },
  {
    name: "Meowsalot",
    species: "Cat",
    favFoods: ["tuna", "catnip", "celery"],
    birthYear: 2012,
    photo: "https://learnwebcode.github.io/json-example/images/cat-1.jpg"
  }
];

let petAge = (year) => {
  let age = (new Date()).getFullYear() - year;
  switch(age){
    case 0: return `baby`;
      break;
    case 1: return `1 year old`;
      break;
    default: return `${age} years old`;
  }
}

let petFood = (foods) => {
  return `<h4><strong>Favourite food:</strong></h4>
          <ul class="foods-list">
            ${foods.map(food => `<li>${food}</li>`).join('')}
          </ul>`
}

let divCreate = (pet) => {
  return `
    <div class="animal">
      <img class="pet-photo" src="${pet.photo}">
      <h2 class="pet-name"><strong>${pet.name}</strong> <span class="species">(${pet.species})</span></h2>
      <h4><strong>Age:</strong> ${petAge(pet.birthYear)}</h4>
      ${pet.favFoods ? petFood(pet.favFoods) : ''}
    </div>
  `;
}

$(document).ready( () => {
  $("#app").html(`
    <h1 class="app-title">Pets (${petsData.length} results)</h1>
    ${petsData.map(divCreate).join('')}
    <p class="footer">These ${petsData.length} pets were added recently, check for updates soon</p>
    `);
});
