var mainSearchBar = document.querySelector(".filters__search-bar");
var tagsRootElt = document.querySelector(".filters__tags");

// Advanced search fields
var ingredientsRootElt = document.querySelector(".advanced-search-field ul");
var appareilsRootElt = document.querySelector(".advanced-search-field--green ul");
var ustencilsRootElt = document.querySelector(".advanced-search-field--orange ul");

var recipesRootElt = document.querySelector(".recipes");

function Init(){
    PopulateIngredients();
    PopulateAppareils();
    PopulateUstencils();
    PopulateRecipeFeed();
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

function PopulateRecipeFeed(){
    recipesRootElt.innerHTML = "";
    recipes.forEach(r => {
        r.ingredients.forEach(i =>{
            str ="";
            str += `<p><strong>${i.ingredient}:</strong> ${i.quantity} ${i.unit=="undefined"?"":i.unit}</p>`;
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

Init();