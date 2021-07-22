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

var currentAsf; // ASF = Advanced Search Field
var tagList = [];

//#region (Fonctions) Initialization
function Init(){
    //PopulateIngredients();
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
    elt.addEventListener("click", function(e){
        if (elt != currentAsf){
            OpenAsf(elt);
            currentAsf = elt;
        }
    })
    // var events = ["click"];
    // for (let i=0; i<events.length; i++){
    //     elt.addEventListener(events[i], function(e){
    //         events[i]=="click"?SwitchSearchFieldState(true, elt):SwitchSearchFieldState(false, elt);
    //     })
    // }
}
//#endregion

//#region (Fonctions) Population
function PopulateIngredients(tagList = []){
    ingredientsRootElt.innerHTML = "";
    ingredientsToDisplay = [];
    if (tagList.length > 0 || mainSearchBar.value.toString().length){
        // [TODO] Filtering data with tags & main search input
    }
    else ingredientsToDisplay = ingredients;
    ingredientsToDisplay.forEach(i =>{
        ingredientsRootElt.innerHTML += `<li><button type="button"><span>${i}</span></button></li>`;
    })
}

function PopulateAppareils(tagList = []){
    appareilsRootElt.innerHTML = "";
    appareils.forEach(a =>{
        appareilsRootElt.innerHTML += `<li><button type="button"><span>${a}</span></button></li>`;
    })
}

function PopulateUstencils(tagList = []){
    ustencilsRootElt.innerHTML = "";
    ustensils.forEach(u =>{
        ustencilsRootElt.innerHTML += `<li><button type="button"><span>${u}</span></button></li>`; 
    })
}

function PopulateAdvancedSearchField(id){
    switch(id){
        case "Ingrédient":
            PopulateIngredients();
            break;
        case "Appareil":
            PopulateAppareils();
            break;   
        case "Ustensile":
            PopulateUstencils();
            break;  
    }
}

function PopulateRecipeFeed(tagList = []){
    recipesRootElt.innerHTML = "";
    recipesToDisplay = [];
    if (tagList.length > 0 || mainSearchBar.value.toString().length){
        // [TODO] Filtering data with tags & main search input
    }
    else recipesToDisplay.push(recipesJSON);
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

function OpenAsf(elt){
    // Close all other asfs
    var asfRootElt = document.querySelector(".filters__advanced-search");
    asfRootElt.querySelectorAll('div[data-info=asf]').forEach(asf => {
        asf.querySelector(".advanced-search-field__tags ul").innerHTML = "";
        asf.querySelector(".advanced-search-field__text-input").setAttribute("placeholder", `${asf.querySelector(".advanced-search-field__text-input").id}s`);
    })
    // Opening current asf
    PopulateAdvancedSearchField(elt.id);
    elt.setAttribute("placeholder", `Rechercher un ${elt.id}`);
    //if (!elt.value > 0) elt.setAttribute("placeholder", `Rechercher un ${elt.id}`)
    //elt.style.opacity = "0.7";
    //elt.style.maxHeight = "100px";
    // elt.parentNode.querySelector(".advanced-search-field__tags ul").innerHTML = "";
    // elt.setAttribute("placeholder", `${elt.id}s`);
}

Init();