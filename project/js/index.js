var mainSearchBar = document.querySelector(".filters__search-bar");
var tagsRootElt = document.querySelector(".filters__tags");

// Advanced search fields
var ingredientsRootElt = document.querySelector(".advanced-search-field ul");
var appareilsRootElt = document.querySelector(".advanced-search-field--green ul");
var ustencilsRootElt = document.querySelector(".advanced-search-field--orange ul");

function Init(){
    PopulateIngredients();
    PopulateAppareils();
    PopulateUstencils();
    InitEvents();
}

function InitEvents(){
    mainSearchBar.addEventListener("input", function(e){
       if(mainSearchBar.value.toString().length > 2){
           console.log("Refresh UI");
       }
    })

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