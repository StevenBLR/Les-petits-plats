var mainSearchBar = document.querySelector(".filters__search-bar");
var tagsRootElt = document.querySelector(".filters__tags");
var recipesRootElt = document.querySelector(".recipes");

//#region (Elements) Advanced search fields
var ingredientsRootElt = document.querySelector(".advanced-search-field ul");
var appareilsRootElt = document.querySelector(".advanced-search-field--green ul");
var ustencilsRootElt = document.querySelector(".advanced-search-field--orange ul");

var ingredientTxtField = document.querySelector(".advanced-search-field .advanced-search-field__text-input")
var appareilsTxtField = document.querySelector(".advanced-search-field--green .advanced-search-field__text-input");
var ustencilsTxtField = document.querySelector(".advanced-search-field--orange .advanced-search-field__text-input");

var asfPlaceholders = document.querySelectorAll(".filters__advanced-search::placeholder");
//#endregion

//#region (Fonctions) Initialization
function Init(){
    PopulateIngredients();
    //PopulateAppareils();
    //PopulateUstencils();
    PopulateRecipeFeed();
    InitEvents();
}

function InitEvents(){
    // Text input on main search bar
    mainSearchBar.addEventListener("input", function(e){
       if(mainSearchBar.value.toString().length > 2){
           console.log("Refresh UI");
           GetMatchingElement(mainSearchBar.value);
       }
    })
    InitAdvancedSearchField(ingredientTxtField);
    InitAdvancedSearchField(appareilsTxtField);
    InitAdvancedSearchField(ustencilsTxtField);
}

function InitAdvancedSearchField(elt){
    var events = ["focus","blur"];
    for (let i=0; i<events.length; i++){
        elt.addEventListener(events[i], function(e){
            events[i]=="focus"?SwitchSearchFieldState(true, elt):SwitchSearchFieldState(false, elt);
        })
    }
}
//#endregion

//#region (Fonctions) Population
function PopulateIngredients(){
    ingredientsRootElt.innerHTML = "";
    ingredients.forEach(i =>{
        ingredientsRootElt.innerHTML += `<li><button type="button"><span>${i}</span></button></li>`;
    })
}

function PopulateAppareils(){
    appareilsRootElt.innerHTML = "";
    appareils.forEach(a =>{
        appareilsRootElt.innerHTML += `<li><button type="button"><span>${a}</span></button></li>`;
    })
}

function PopulateUstencils(){
    ustencilsRootElt.innerHTML = "";
    ustensils.forEach(u =>{
        ustencilsRootElt.innerHTML += `<li><button type="button"><span>${u}</span></button></li>`; 
    })
}

function PopulateRecipeFeed(tagList = [], searchBarInput = ""){
    recipesRootElt.innerHTML = "";
    recipesToDisplay = [];
    if (tagList.length > 0 || searchBarInput != ""){

    }
    else{

    }
    recipesJSON.forEach(r => {
        str ="";
        r.ingredients.forEach(i =>{
            str += `<p><strong>${i.ingredient} ${i.hasOwnProperty('quantity') || i.hasOwnProperty('unit')?":":""}</strong> ${i.hasOwnProperty('quantity')?i.quantity:""} ${i.hasOwnProperty('unit')?i.unit:""}</p>`;
        })
        recipesRootElt.innerHTML += 
        `<div class="card recipes__card">
        <img src="../imgs/sample_img.jpg" class="card-img-top recipes__img" alt="...">
        <div class="card-body">
          <h5 class="card-title recipes__title">${r.name}</h5>
          <div class="recipes__time-label">
            <i class="far fa-clock"></i>
            <span class="recipes__time">${r.time} min</span>
          </div>
          <div class="recipes__content">
            <div class="recipes__ingredients">
            ${str}
            </div>
            <div class="recipes__recipe">
              <p>${r.description}</p>
          </div>
        </div>
      </div>
        `
    })
}
//#endregion

function SwitchSearchFieldState(open, elt){
    //open?console.log(`Opening`, elt):console.log(`Closing`, elt);
    if(open){
        //elt.style.opacity = "0.7";
        //elt.style.maxHeight = "100px";
        if (!elt.value > 0) elt.setAttribute("placeholder", `Rechercher un ${elt.id}`)
    }
    else{
        //elt.style.opacity = "1";
        //elt.style.maxHeight = "0px";
        elt.setAttribute("placeholder", `${elt.id}s`);
    }
}

Init();