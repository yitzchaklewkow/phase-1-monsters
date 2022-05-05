document.addEventListener("DOMContentLoaded", function() {
    let page = 1;
    const container = document.querySelector('#monster-container');
    const formContainer = document.querySelector('#create-monster');
    const backBtn = document.querySelector('#back');
    const frwdBtn = document.querySelector('#forward');
   function fetcher(page = 1) {
    container.innerHTML ='';
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
.then(res => res.json())
.then(monsterArr => monsterCatcher(monsterArr));
   }
  
   fetcher(page);

   
backBtn.addEventListener('click', () => {
    if (page > 1) {

        page--;
        fetcher(page);
    }});
frwdBtn.addEventListener('click', () => {
    page++;
    fetcher(page);
});



console.log(container)
function monsterCatcher(monsterArr) {
    monsterArr.forEach(monster => {
        container.append(createMonster(monster))

    });
}

function createMonster(monster) {
    const card = document.createElement('div')
    const name = document.createElement('h2')
    const age = document.createElement('h4')
    const bio = document.createElement('p')
    name.textContent = monster.name
    age.textContent = 'Age: ' + monster.age
    bio.textContent = 'Bio: ' + monster.description
    card.append(name, age, bio)
    //console.log(card)
    return card;
}

const form = document.createElement('form')
const nameInp = document.createElement('input')
const ageInp = document.createElement('input')
const bioInp = document.createElement('input')
const createInp = document.createElement('input')
nameInp.type = 'text'
nameInp.placeholder = 'name...'
ageInp.type = 'text';
ageInp.placeholder = 'age...'
bioInp.type = 'text'
bioInp.placeholder = 'description'
createInp.type = 'submit'
createInp.value = 'Create'
form.append(nameInp, ageInp, bioInp, createInp);
formContainer.append(form);
form.addEventListener('submit', userMonster)

function userMonster(e){
    e.preventDefault();
    const monsterObj = {
    name: nameInp.value,
    age: ageInp.value,
    description: bioInp.value
    }
    console.log(monsterObj)
    container.append(createMonster(monsterObj))
    form.reset();
}
});