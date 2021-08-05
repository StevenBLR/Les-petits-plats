class Tag{
    constructor(name, id, type = ""){
        this.name = name;
        this.id = id;
        this.type = type;
    }
}

const blue = "#3282F7";
const green = "#68D9A4";
const orange = "#ED6454";

var mainSearchBar = document.querySelector(".filters__search-bar");
var tagsRootElt = document.querySelector(".filters__tags");
var recipesRootElt = document.querySelector(".recipes");

var currentAsf; // ASF = Advanced Search Field
var currentTagList = [];
var currentRecipeList = [];


function search(mainSearchInput, tags){

    // Get all recipes
    const allRecipes = [...recipes];

    recipes.forEach(recipe => {
        let visible = false;

        // Get the main search
        if(recipe.name.indexOf(mainSearchBar) > -1){
            visible = true;
        }

        if(recipe.description.indexOf(mainSearchBar) > -1){
            visible = true;
        }
        
        // Get all the tags
        // -> Array of tags
        let score = 0;

        tags.forEach(tag => {
            
            if(tag.type == "ustensil"){
                if(recipe.ustensils.includes(tag.name)){
                    score++;
                }
            }

            if(tag.type == "appliance"){
                if(recipe.appliance == tag.name){
                    score++;
                }
            }
        });

        if(score == tags.length){
            visible = true;
        }



        recipe.visible = visible;
    });


}


//#region (Fonctions) Initialization
function Init(){
    PopulateRecipeFeed(true);
    InitEvents();
    tagsRootElt.innerHTML = "";
}

function InitEvents(){
    // Main Search Bar
    mainSearchBar.addEventListener("input", function(e){
       if(mainSearchBar.value.toString().length > 2){
           console.log("Refresh UI");
           PopulateRecipeFeed(false, GetMatchingElement(mainSearchBar.value, currentTagList));
       }
    })
    // Advanced Search Fields
    document.querySelectorAll("[data-info=asf]").forEach(asf => {
        InitAdvancedSearchField(asf.querySelector(".advanced-search-field__text-input"));
    })
}

function InitAdvancedSearchField(elt){
    // Click on text input
    elt.addEventListener("click", function(e){
        if (elt != currentAsf){
            OpenAsf(elt);
            currentAsf = elt;
        }
    })
}
//#endregion

//#region (Fonctions) Population
function PopulateAdvancedSearchField(id){
    // id = asf child id --> Getting asf parent root from current element
    console.log(`Child element's id = #${id}`);
    var asfParent = document.querySelector(`#${id}`).closest("[data-info=asf]");
    var currentAsfId = asfParent.querySelector("input").id;
    console.log(currentAsfId);
    var asfTagRoot = asfParent.querySelector(".advanced-search-field__tags");
    // Delete current asf list root
    if(asfParent.querySelector(".advanced-search-field__tags ul"))
    asfParent.querySelector(".advanced-search-field__tags ul").remove();
    var ulElt = document.createElement("ul");

    elementsToDisplay = [];
    if (currentTagList.length > 0 || mainSearchBar.value.toString().length){
        //elementsToDisplay.push(GetFilteredAsfElements(currentAsfId,mainSearchBar.value,currentTagList));
        elementsToDisplay = [...GetAsfElementsFromRecipes(currentAsfId, currentRecipeList)];
        console.log("Elements to display",elementsToDisplay);
    }
    else{
        switch(id){
            case "Ingrédient":
                elementsToDisplay = GetAllIngredients();
                break;
            case "Appareil":
                elementsToDisplay = GetAllAppareils();
                break;
            case "Ustensile":
                elementsToDisplay = GetAllUstencils();
                break;
        }
    }
    if(elementsToDisplay.length > 0){
        elementsToDisplay.forEach(i =>{
            if(i != "undefined" && i.length > 0){
                var btElt = document.createElement("button");
                var btId = i.toString().split(' ').join('-');
                btElt.id = btId; // Remplacemeent des espaces par les tirets
        
                // Click event - Create tag
                btElt.addEventListener("click", function(e){
                    if(!currentTagList.find(tag => tag.id == e.target.parentNode.id) || !currentTagList.find(tag => tag.name == i)){
                        e.preventDefault();
                        //e.stopImmediatePropagation();
                        //console.log(e.target.parentNode.id);
                        PopulateTag(i, e.target.parentNode.id,currentAsfId);
                        PopulateRecipeFeed(false, GetMatchingElement(mainSearchBar.value,currentTagList));
                        PopulateAdvancedSearchField(currentAsfId);
                        //PopulateAdvancedSearchField(currentAsfId);
                    }
                });
        
        
                var liElt = document.createElement("li");
                asfParent.appendChild(liElt);
                liElt.appendChild(btElt);
                ulElt.appendChild(liElt);
        
                var spanElt = document.createElement("span");
                spanElt.textContent = i;
                btElt.appendChild(spanElt);
            }
        })
        asfTagRoot.appendChild(ulElt);
    }
    else console.error("Nothing to display in ASF");
}

function PopulateRecipeFeed(displayAll = false, filteredRecipes = []){
    recipesRootElt.innerHTML = "";
    recipesToDisplay = [];
    currentRecipeList = [...filteredRecipes];
    // if (currentTagList.length > 0 || mainSearchBar.value.length){
    //     // [TODO] Filtering data with tags & main search input
    //     recipesToDisplay.push(tagList);
    // }
    if (displayAll) recipesToDisplay = [...recipesJSON];
    else recipesToDisplay = [...filteredRecipes];
    recipesToDisplay.forEach(r => {
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

function PopulateTag(title, id, type){
    // Layout - Creating elements
    var spanElt = document.createElement("span");
    spanElt.classList.add("filters__tag");
    spanElt.textContent = title;
    var btElt = document.createElement("button");
    btElt.setAttribute("data-info",id);
    var iElt = document.createElement("i");
    iElt.classList.add("far");
    iElt.classList.add("fa-times-circle");
    btElt.appendChild(iElt);
    spanElt.appendChild(btElt);
    tagsRootElt.appendChild(spanElt);

    // Events - Click on button to delete tag
    btElt.addEventListener("click", function(e){
        e.preventDefault();
        e.target.closest(".filters__tag").remove();
        currentTagList.splice(currentTagList.findIndex(tag => tag.id == id),1);
        // Reload filter systeme to previous setup when a tag is deleted
        if(currentTagList.length >= 1) PopulateRecipeFeed(false, GetMatchingElement(mainSearchBar.value,currentTagList));
        // Load all recipes when there is no more tags
        else PopulateRecipeFeed(true);
        // Update Asfs 
        PopulateAdvancedSearchField(currentAsf.id);
    })

    // Style - Update tag color with type
    switch(type){
        case "Ingrédient":
            spanElt.style.backgroundColor = blue;
            break;
        case "Appareil":
            spanElt.style.backgroundColor = green;
            break;
        case "Ustensile":
            spanElt.style.backgroundColor = orange;
            break;
    }

    // Data - Updating tag list
    currentTagList.push(new Tag(title,id,type));
    console.log(currentTagList);

    // Populate ASF
    
}
//#endregion

function OpenAsf(elt){
    // Getting all asf root
    var asfRootElt = document.querySelector(".filters__advanced-search");
    // Close every Asf
    asfRootElt.querySelectorAll('div[data-info=asf]').forEach(asf => {
        // Delete current asf list root
        if(asf.querySelector(".advanced-search-field__tags ul"))
        asf.querySelector(".advanced-search-field__tags ul").remove();
        // Update selected asf
        if(asf.querySelector(".advanced-search-field__text-input"))
        asf.querySelector(".advanced-search-field__text-input").setAttribute("placeholder", `${asf.querySelector(".advanced-search-field__text-input").id}s`);
    })
    // Open current asf
    PopulateAdvancedSearchField(elt.id);
    elt.setAttribute("placeholder", `Rechercher un ${elt.id}`);
}

function GetAsfElementsFromRecipes(asfId, currentRecipes){
    const asfContent = [];
    // Adding asf elts from current recipes list if not stored
    currentRecipes.forEach(r => {
        // Adding Appliances
        if (asfId == "Appareil" && !asfContent.includes(r.appliance)) asfContent.push(r.appliance);

        // Adding Ingrédients
        if (asfId == "Ingrédient") r.ingredients.forEach(i => {
            if (!asfContent.includes(i.ingredient)) asfContent.push(i.ingredient);});

        // Adding Ustencils
        if (asfId == "Ustensile") r.ustensils.forEach(u => {
            if(!asfContent.includes(u)) asfContent.push(u);});
    })
    console.log("Asf Content", asfContent);
    return asfContent;
}

function GetTagTypeWithId(id){
    var asfId = currentTagList.find(tag => tag.id == id);
    return asfId;
}

Init();