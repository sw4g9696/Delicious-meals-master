// set some variables
const mySidenav = document.getElementById("mySidenav");
const favouriteMealsBody = document.getElementById("favourites-body");
const mealHeading = document.querySelector("#meal-body h1");
const footer = document.getElementsByTagName("footer")[0];

// set sound variable
let audio = new Audio("./assets/audios/Sound-Effects.mp3");

// side menu  open function
function openNav() {
    mySidenav.style.width = "250px";
}

// side menu close  function
function closeNav() {
    mySidenav.style.width = "0";
}

// its fetch meals from api and return it(fetch API functions and returns data)
async function fetchMealsFromApi(url, value) {
    const response = await fetch(`${url + value}`);
    const meals = await response.json();
    return meals;
}

// its shows all favourites meals in favouriteMealsBody
async function showFavMealList() {
    closeNav();
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html = "";
    if (arr.length == 0) {
        html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container mt-11rem">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">Sorry</span>
                            <div class="mb-4 lead">
                                No meal added in your favourites list.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        footer.style.position = "fixed";
    } else {
        for (let index = 0; index < arr.length; index++) {
            await fetchMealsFromApi(url, arr[index]).then(data => {
                html += `
                <div id="card" class="card mb-3" >
                    <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="..." onclick="mealDetails(${data.meals[0].idMeal})">
                    <div class="card-body">
                        <h5 class="card-title">${data.meals[0].strMeal}</h5>
                        <div id="contain-info-btn" class="d-flex justify-content-between">
                            <button type="button" name="more-details" class="btn btn-outline-light" onclick="mealDetails(${data.meals[0].idMeal})">More Details</button>
                            <button id="main${data.meals[0].idMeal}" name="favourite" class="btn btn-outline-light fav-btn bg-w" onclick="removeToFavList(${data.meals[0].idMeal})" style="border-radius:50%">
                            <i class="fa-solid fa-heart clr-blue"></i>
                            </button>
                        </div>
                    </div>
                </div>
                `;
            });
        }
        footer.style.position = "relative";
    }
    favouriteMealsBody.innerHTML = html;
    footer.style.opacity = "1";
    return;
}


//its remove meal to the favourites meal list
async function removeToFavList(id) {
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let number = arr.indexOf(id);
    arr.splice(number, 1);
    localStorage.setItem("favouritesList", JSON.stringify(arr));
    await showFavMealList();
    audio.play();
}

//its shows open a mealDetails page
async function mealDetails(id) {
    console.log(id, "meal id in fav");
    localStorage.setItem("mealId", id);
    window.open("./mealDetails.html", '_parent');
}

// This function will be invoked, whenever the document is fully loaded into the window. 
(function pageload() {
    showFavMealList();
}
)();