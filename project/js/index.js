var ingredientsRootElt = document.querySelector(".advanced-search-field ul");
var appareilsRootElt = document.querySelector(".advanced-search-field--green ul");
var ustencilsRootElt = document.querySelector(".advanced-search-field--orange ul");

function Init(){
    PopulateIngredients();
    PopulateAppareils();
    PopulateUstencils();
}

function PopulateIngredients(){
    ingredientsRootElt.innerHTML = "";
    ingredients.forEach(i =>{
        ingredientsRootElt.innerHTML += `<li><button type="button">${i}</button></li>`;
    })
}

function PopulateAppareils(){
    appareilsRootElt.innerHTML = "";
    appareils.forEach(a =>{
        appareilsRootElt.innerHTML += `<li><button type="button">${a}</button></li>`;
    })
}

function PopulateUstencils(){
    ustencilsRootElt.innerHTML = "";
    ustensils.forEach(u =>{
        ustencilsRootElt.innerHTML += `<li><button type="button">${u}</button></li>`; 
    })
}

Init();