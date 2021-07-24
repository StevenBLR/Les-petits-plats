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

//#region (Fonctions) Initialization
function Init(){
    PopulateRecipeFeed();
    InitEvents();
    tagsRootElt.innerHTML = "";
}

function InitEvents(){
    // Text input on main search bar
    mainSearchBar.addEventListener("input", function(e){
       if(mainSearchBar.value.toString().length > 2){
           console.log("Refresh UI");
           GetMatchingElement(mainSearchBar.value);
       }
    })
    
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
function PopulateAdvancedSearchField(inputField){
    var asfParent = inputField.parentNode;
    var asfTagRoot = asfParent.querySelector(".advanced-search-field__tags");
    var ulElt = document.createElement("ul");

    elementsToDisplay = [];
    if (false){//(currentTagList.length > 0 || mainSearchBar.value.toString().length){
        console.log("No tag filtering yet"); // [TODO] Filtering data with tags & main search input
    }
    else{
        switch(inputField.id){
            case "Ingrédient":
                elementsToDisplay = ingredients;
                break;
            case "Appareil":
                elementsToDisplay = appareils;
                break;
            case "Ustensile":
                elementsToDisplay = ustensils;
                break;
        }
    }
    elementsToDisplay.forEach(i =>{
        var btElt = document.createElement("button");
        var btId = i.split(' ').join('-');
        btElt.id = btId; // Remplacemeent des espaces par les tirets

        // Click event - Create tag
        btElt.addEventListener("click", function(e){
            if(!currentTagList.find(tag => tag.id == btId)){
                e.preventDefault();
                //e.stopImmediatePropagation();
                console.log(e.target.parentNode.id);
                PopulateTag(i, e.target.parentNode.id,inputField.id);
            }
        });


        var liElt = document.createElement("li");
        asfParent.appendChild(liElt);
        liElt.appendChild(btElt);
        ulElt.appendChild(liElt);

        var spanElt = document.createElement("span");
        spanElt.textContent = i;
        btElt.appendChild(spanElt);
    })
    asfTagRoot.appendChild(ulElt);


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
        e.target.parentNode.parentNode.remove();
        currentTagList.splice(currentTagList.findIndex(tag => tag.id == id));
        console.log(currentTagList);
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
}
//#endregion

function OpenAsf(elt){
    // Close all other asfs
    var asfRootElt = document.querySelector(".filters__advanced-search");
    asfRootElt.querySelectorAll('div[data-info=asf]').forEach(asf => {
        if(asf.querySelector(".advanced-search-field__tags ul"))
        asf.querySelector(".advanced-search-field__tags ul").remove();
        if(asf.querySelector(".advanced-search-field__text-input"))
        asf.querySelector(".advanced-search-field__text-input").setAttribute("placeholder", `${asf.querySelector(".advanced-search-field__text-input").id}s`);
    })
    // Opening current asf
    //PopulateAdvancedSearchField(elt.id);
    PopulateAdvancedSearchField(elt)
    elt.setAttribute("placeholder", `Rechercher un ${elt.id}`);
}



Init();