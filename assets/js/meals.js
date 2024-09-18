// its make a favourites meal array if its not exist in local storage
if (localStorage.getItem("favouritesList") == null) {
  localStorage.setItem("favouritesList", JSON.stringify([]));
}

// set sound variable
let audio = new Audio("./assets/audios/Sound-Effects.mp3");


// create some variables
const mySidenav = document.getElementById("mySidenav");
let searchBar = document.getElementById("search-bar");
let inputText = document.getElementById("user-input");
let resultHeading = document.getElementById("result-heading");
let mealsContainer = document.getElementById("meals-container");
const mealHeading = document.querySelector("#meal-body h1");
const footer = document.getElementsByTagName("footer")[0];


// side nav Menu  open function
function openNav() {
  mySidenav.style.width = "250px";
}

// side nav Menu close  function
function closeNav() {
  mySidenav.style.width = "0";
}


// its fetch meals from api and return it(fetch API functions and returns data)
async function fetchMealsFromApi(url, value) {
  const response = await fetch(`${url + value}`);
  const meals = await response.json();
  return meals;
}

// its show's all meals card in mealsContainer acording to search input value
function showMealList() {
  closeNav();
  let inputValue = inputText.value;

  if (inputValue) {
    resultHeading.innerHTML = `<h3>Your Search Results : ${inputValue}</h3>`;
  }

  let arr = JSON.parse(localStorage.getItem("favouritesList"));
  let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  let html = "";
  let meals = fetchMealsFromApi(url, inputValue);
  meals.then(data => {
    if (data.meals) {
      data.meals.forEach((element) => {
        if (arr.includes(parseInt(element.idMeal))) {
          console.log("present showmeal");
          html += `
                <div  class="card mb-3" >
                    <img src="${element.strMealThumb}" class="card-img-top" alt="${element.idMeal} pic." onclick="mealDetails(${element.idMeal})">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div id="contain-info-btn" class="d-flex justify-content-between">
                            <button type="button" name="more-details" class="btn btn-outline-light" onclick="mealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" name="favourite" class="btn btn-outline-light fav-btn bg-w" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%">
                            <i class="fa-solid fa-heart clr-blue"></i>
                            </button>
                        </div>
                    </div>
                </div>
                `;
        }
        else {
          html += `
                <div  class="card mb-3" >
                    <img src="${element.strMealThumb}" class="card-img-top" alt="${element.idMeal} pic." onclick="mealDetails(${element.idMeal})">
                    <div class="card-body">
                        <h5 class="card-title">${element.strMeal}</h5>
                        <div id="contain-info-btn" class="d-flex justify-content-between">
                            <button type="button" name="more-details" class="btn btn-outline-light" onclick="mealDetails(${element.idMeal})">More Details</button>
                            <button id="main${element.idMeal}" name="favourite" class="btn btn-outline-light fav-btn" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                        </div>
                    </div>
                </div>
                `;
        }
      });
    }
    mealsContainer.innerHTML = html;
    footer.style.position = "relative";
  });
  footer.style.opacity = "1";
}
// -----------------------------------------------------------------------


//its adds and remove meals to favourites list
function addRemoveToFavList(id) {
  let arr = JSON.parse(localStorage.getItem("favouritesList"));
  let contain = false;
  if (arr.includes(id)) {
    contain = true;
  }
  if (contain) {
    let number = arr.indexOf(id);
    arr.splice(number, 1);
    localStorage.setItem("favouritesList", JSON.stringify(arr));
  } else {
    arr.push(id);
  }
  localStorage.setItem("favouritesList", JSON.stringify(arr));
  audio.play();
  showMealList();
}

//its open a mealDetails page
async function mealDetails(id) {
  localStorage.setItem("mealId", id);
  window.open("./mealDetails.html", "_parent");
}

// whenever document is fully loaded, then IIFE work. 
(function pageload() {
  showMealList();
}
)();
