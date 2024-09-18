// set some variables
const mySidenav = document.getElementById("mySidenav");
const mealdetailBody = document.getElementById("detail-body");
const mealHeading = document.querySelector("#meal-body h1");
const footer = document.getElementsByTagName("footer")[0];
let meal;

// its fetch meals from api and return it(fetch API functions and returns data)
async function fetchMealsFromApi(url, value) {
    const response = await fetch(`${url + value}`);
    const meals = await response.json();
    return meals;
}

//its shows meal details in the meal-details-body(Asyn function)
async function showMealDetails(id) {
    let url="https://www.themealdb.com/api/json/v1/1/lookup.php?i="; //API url
    let html="";
    // console.log(id, "id"); 
    await fetchMealsFromApi(url,id).then(data=>{
        meal= data.meals[0];
        html += `
        <h1 class="text-center p-2 mt-3 fw-semibold text-gradient">Meal Details</h1>
          <div id="meal-details" class="mb-5">
            <div id="meal-header" class="d-flex flex-column align-items-center flex-wrap">
              <div id="meal-thumbail">
                <img class="detail-img" src="${meal.strMealThumb}" alt="" srcset="">
              </div>
              <div id="details">
                <h3 class="text-center">${meal.strMeal}</h3>
                <hr/>
                <h6 class="d-flex justify-content-around">
                <span>Category</span> 
                <span style="width:fit-content">:</span> 
                <span> ${meal.strCategory}</span></h6>
                <h6 class="d-flex justify-content-around"> 
                <span> Area </span>
                <span style="width:fit-content">:</span> 
                <span>${meal.strArea}</span>
                </h6>
              </div>
            </div>
            <div id="meal-instruction" class="mt-3 container">
              <h5 class="text-center"> Instruction </h5>
              <hr/>
              <p class="text-center"></p>
            </div>
            <div class="text-center">
              <a href="${meal.strYoutube}" target="_blank" name="video" class="btn btn-outline-light mt-3">Watch Video</a>
            </div>
          </div>
        `;
    });
    mealdetailBody.innerHTML=html;
    document.querySelector("#meal-instruction p").innerText=meal.strInstructions;
    footer.style.opacity="1";
}

// set function for sidenav menu open
function openNav() {
    mySidenav.style.width = "250px";
}

// set function for sidenav menu close
function closeNav() {
    mySidenav.style.width = "0";
}

//whenever document is fully loaded, then IIFE work.
(function pageload() {
    let id= parseInt(localStorage.getItem("mealId"));
    console.log("pageload");
    showMealDetails(id);
}
)();