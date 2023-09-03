// side Bar
/* ELEMENTS FOR CONTACT FORM VALIDATION  */
const userName = $('#userName');
const userEmail = $('#userEmail');
const userPhone = $('#userPhone');
const userAge = $('#userAge');
const userPassword = $('#userPassword');
const userRePassword = $('#userRePassword');
const submitBtn = $('#submitBtn');
const contact = $('#contact');


/* ---------------------------------------------------------- */
let sideBarInnerWidth = $(".sideBar-inner").innerWidth();

function closeSideBar() {
  $("#side-bar").animate({ left: -sideBarInnerWidth }, 700);
  $(".sideBar-outter i:first").removeClass("fa-x");
  $(".sideBar-outter i:first").addClass("fa-align-justify");
  for (let i = 0; i < 5; i++) {
    $(".links  li")
      .eq(i)
      .animate(
        {
          top: 400,
        },
        (5 - i) * 100
      );
  }
}
$("#side-bar").css("left", -sideBarInnerWidth);
$(".sideBar-outter i ").click(function () {
  if ($("#side-bar").css("left") == "0px") {
    $("#side-bar").animate({ left: -sideBarInnerWidth }, 700);
    $(".sideBar-outter i:first").removeClass("fa-x");
    $(".sideBar-outter i:first").addClass("fa-align-justify");
    for (let i = 0; i < 5; i++) {
      $(".links  li")
        .eq(i)
        .animate(
          {
            top: 400,
          },
          (5 - i) * 100
        );
    }
  } else {
    $("#side-bar").animate({ left: "0px" }, 700);
    $(".sideBar-outter i:first").removeClass("fa-align-justify");
    $(".sideBar-outter i:first").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
      $(".links  li")
        .eq(i)
        .animate(
          {
            top: 0,
          },
          (i + 5) * 100
        );
    }
  }
});
// loading

$(document).ready(() => {
  homeMeal(" ").then(() => {
    $("#loading").fadeOut(1000);
    $("body").css("overflow", "visible");
  });
});

// main functions

function displayCards(arr) {
  let mealhtml = ``;
  for (let i = 0; i < arr.length; i++) {
    mealhtml += `
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="foodCard position-relative overflow-hidden rounded-5" data-meal-id=${arr[i].idMeal} >
              <img
                src="${arr[i].strMealThumb}"
                class="w-100"
              />
              <div
                class="war2h position-absolute d-flex align-items-center text-black p-2"
              >
                <h3>${arr[i].strMeal}</h3>
              </div>
            </div>
          </div>
        `;
  }
  data.innerHTML = mealhtml;
}

$("#data").click(function (event) {
  let mealId = $(event.target).closest("[data-meal-id]").attr("data-meal-id");
  getmealdetails(mealId);
});
async function getmealdetails(mealId) {
  $("#loading").fadeIn(100);
  $("body").css("overflow", "hidden");

  let hatelmeals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  let response = await fetch(hatelmeals);
  let mealsss = await response.json();
  $("#loading").fadeOut(1000);
  $("body").css("overflow", "visible");
  createRecipe(mealsss["meals"][0]);
  createTags(mealsss["meals"][0]);
  card(mealsss["meals"][0]);
}
function createRecipe(mealsss) {
  let recipe = ``;
  for (let i = 1; i <= 20; i++) {
    if (!mealsss[`strIngredient${i}`]) {
      break;
    } else {
      recipe += `<p class="bg-info-subtle p-2 rounded-2">${mealsss[`strMeasure${i}`] + " " + mealsss[`strIngredient${i}`]
        } </p>`;
    }
  }

  return recipe;
}

function createTags(mealsss) {
  let tagElement = ``;
  if (mealsss["strTags"]) {
    let tags = mealsss["strTags"].split(",");
    for (let tag of tags) {
      tagElement += `<p class="bg-danger-subtle p-2 rounded-2">${tag} </p>`;
    }
  }

  return tagElement;
}

async function card(mealsss) {
  $('#searchsec').addClass("d-none");
  contact.addClass('d-none');

  let mealhtml = `
  
    <div class="col-12 col-md-4">
                <img class="w-100 rounded-3" src="${mealsss.strMealThumb
    }" alt="">
                    <h2>${mealsss.strMeal}</h2>
            </div>
            <div class="col-12 col-md-8 col-lg-8">
                <h2>Instructions</h2>
                <p>${mealsss.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${mealsss.strArea
    }</h3>
                <h3><span class="fw-bolder">Category : </span>${mealsss.strCategory
    }</h3>
                <p class="fs-2 fw-bold">Recipes :</p>
        <div class="ingredients d-flex flex-wrap gap-3 ps-3 text-black">
${this.createRecipe(mealsss)}        </div>

                <p class="fs-2 fw-bold">Tags :</p>
                <div class="tags d-flex flex-wrap gap-3 ps-3 text-black">
${this.createTags(mealsss)}        </div>

                <a target="_blank" href="${mealsss.strSource
    }" class="btn btn-success">Source</a>
                <a target="_blank" href="${mealsss.strYoutube
    }" class="btn btn-danger">Youtube</a>
            </div>
  `;

  data.innerHTML = mealhtml;
}

// main page
let page = document.getElementById("data");

async function meals(y = "") {
  let homeMeals = `https://www.themealdb.com/api/json/v1/1/search.php?s=${y}`;
  let response = await fetch(homeMeals);
  let food = await response.json();
  return food;
}
async function homeMeal(a) {
  let ma3to2 = await meals(a);
  let mealhtml = ``;
  for (let i = 0; i < ma3to2["meals"].length; i++) {
    mealhtml += `
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="foodCard position-relative overflow-hidden rounded-5" data-meal-id=${ma3to2.meals[i].idMeal}>
              <img
                src="${ma3to2.meals[i].strMealThumb}"
                class="w-100"
              />
              <div
                class="war2h position-absolute d-flex align-items-center text-black p-2"
              >
                <h3>${ma3to2.meals[i].strMeal}</h3>
              </div>
            </div>
          </div>
        `;
  }
  data.innerHTML = mealhtml;
}
// search page
let nameSearch = $('#nameSearch')
let letterSearch = $("#letterSearch")

function showSearch() {
  $('#searchsec').removeClass("d-none");
  contact.addClass('d-none');
  data.innerHTML = ``;
}

$(nameSearch).keyup(function () {
  homeMeal(nameSearch.val())
});
function showSearchbyletter() {
  $('#searchsec').removeClass("d-none");
  contact.addClass('d-none');
  data.innerHTML = ``;
}
$(letterSearch).keyup(function () {
  homeMeal(letterSearch.val())
});
// category page

async function mealbycategory() {
  data.innerHTML = ``;
  $("#loading").fadeIn(100);
  $("body").css("overflow", "hidden");
  let categorymeals = "https://www.themealdb.com/api/json/v1/1/categories.php";
  let response = await fetch(categorymeals);
  let mealsbycategory = await response.json();
  $("#loading").fadeOut(1000);
  $("body").css("overflow", "visible");

  return mealsbycategory;
}
async function categorymeal() {
  $('#searchsec').addClass("d-none");
  contact.addClass('d-none');

  let ma3to2 = await mealbycategory();

  let mealhtml = ``;
  for (let i = 0; i < ma3to2["categories"].length; i++) {
    mealhtml += `
          <div class="col-sm-6 col-md-4 col-lg-3 " data-cat-name=${ma3to2.categories[i].strCategory
      }>
              <div class="foodCard position-relative overflow-hidden rounded-5">
                <img
                  src="${ma3to2.categories[i].strCategoryThumb}"
                  class="w-100"
                />
                <div
                  class="war2h position-absolute text-center text-black p-2"
                >
                <h3>${ma3to2.categories[i].strCategory}</h3>
                  <p>${ma3to2.categories[i].strCategoryDescription
        .split(" ")
        .slice(0, 20)
        .join(" ")}</p>
                </div>
              </div>
            </div>
          `;
  }

  data.innerHTML = mealhtml;
}

$("#data").click(function (event) {
  let catName = $(event.target)
    .closest("[data-cat-name]")
    .attr("data-cat-name");

  hatelcategory(catName);
});
async function hatelcategory(catName) {
  $("#loading").fadeIn(100);
  $("body").css("overflow", "hidden");

  let hatelmeals = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catName}`;
  let response = await fetch(hatelmeals);
  let mealsss = await response.json();
  $("#loading").fadeOut(1000);
  $("body").css("overflow", "visible");
  displayCards(mealsss.meals.slice(0, 20));
}

// Area page
async function mealbyArea() {
  data.innerHTML = ``;
  $("#loading").fadeIn(100);
  $("body").css("overflow", "hidden");
  let Areameals = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
  let response = await fetch(Areameals);
  let mealsbyArea = await response.json();
  $("#loading").fadeOut(1000);
  $("body").css("overflow", "visible");

  return mealsbyArea;
}
async function Areameal() {
  $('#searchsec').addClass("d-none");
  contact.addClass('d-none');

  let ma3to2 = await mealbyArea();

  let mealhtml = ``;
  for (let i = 0; i < ma3to2["meals"].length; i++) {
    mealhtml += `
          <div class="col-sm-6 col-md-4 col-lg-3" data-area-name=${ma3to2.meals[i].strArea}>
              <div class="foodCard position-relative overflow-hidden rounded-2">
              <i  class="fa-solid fa-house-laptop fa-4x"></i>
              <h3>${ma3to2.meals[i].strArea}</h3>
               
              </div>
            </div>
          `;
  }

  data.innerHTML = mealhtml;
}
$("#data").click(function (event) {
  let areaName = $(event.target)
    .closest("[data-area-name]")
    .attr("data-area-name");

  hatelArea(areaName);
});
async function hatelArea(areaName) {
  $("#loading").fadeIn(100);
  $("body").css("overflow", "hidden");

  let hatelmeals = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`;
  let response = await fetch(hatelmeals);
  let mealsss = await response.json();

  $("#loading").fadeOut(1000);
  $("body").css("overflow", "visible");
  displayCards(mealsss.meals.slice(0, 20));
}
// Ingrediants page

async function mealbyIngredient() {
  data.innerHTML = ``;
  $("#loading").fadeIn(100);
  $("body").css("overflow", "hidden");
  let ingredientmeals =
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  let response = await fetch(ingredientmeals);
  let mealsbyIngredient = await response.json();
  $("#loading").fadeOut(1000);
  $("body").css("overflow", "visible");

  return mealsbyIngredient;
}
async function Ingredientmeal() {
  $('#searchsec').addClass("d-none");
  contact.addClass('d-none');

  let ma3to2 = await mealbyIngredient();
  let mealhtml = ``;
  for (let i = 0; i < 20; i++) {
    mealhtml += `
          <div class="col-sm-6 col-md-4 col-lg-3" data-ing-name=${ma3to2.meals[i].strIngredient
      }>
              <div class="foodCard position-relative overflow-hidden rounded-2 text-center text-white">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3 >${ma3to2.meals[i].strIngredient}</h3>
              <p>${ma3to2.meals[i].strDescription
        .split(" ")
        .slice(0, 20)
        .join(" ")}</p>
              </div>
            </div>
          `;
  }

  data.innerHTML = mealhtml;
}
$("#data").click(function (event) {
  let ingName = $(event.target)
    .closest("[data-ing-name]")
    .attr("data-ing-name");

  hatelIng(ingName);
});
async function hatelIng(ingName) {
  $("#loading").fadeIn(100);
  $("body").css("overflow", "hidden");

  let hatelmeals = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingName}`;
  let response = await fetch(hatelmeals);
  let mealsss = await response.json();
  $("#loading").fadeOut(1000);
  $("body").css("overflow", "visible");
  displayCards(mealsss.meals);
}

/* ------------------------------------------------------------ */
/* Contact  */
const openContact = $('ul li:last-child');


openContact.click(function () {
  $('#searchsec').addClass("d-none");
  data.innerHTML = ``;
  contact.removeClass('d-none');

})


/* Validation */



/* Validate the user name */
function validateName() {
  const nameRegex = /[\w]{3,}/;
  if (nameRegex.test(userName.val())) {
    userName.next().addClass('d-none')
    return true;
  } else {
    userName.next().removeClass('d-none');
    return false;
  }
}
/* Validate the use Phone */
function validateEmail() {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (emailRegex.test(userEmail.val())) {
    userEmail.next().addClass('d-none')
    return true;
  } else {
    userEmail.next().removeClass('d-none');
    return false;
  }
}
/* Validate the user Phone */
function validatePhone() {
  const phoneRegex = /^(01)\d{9}$/;
  if (phoneRegex.test(userPhone.val())) {
    userPhone.next().addClass('d-none')
    return true;
  } else {
    userPhone.next().removeClass('d-none');
    return false;
  }
}
/* Validate the user Age */
function validateAge() {
  const ageRegex = /^[1-9][0-9]$/;
  if (ageRegex.test(userAge.val())) {
    userAge.next().addClass('d-none')
    return true;
  } else {
    userAge.next().removeClass('d-none');
    return false;
  }
}
/* Validate the user PAssword */
function validatePassword() {
  const passwordRegex = /(?=.*\d)(?=.*[a-zA-z]).{8,}/;
  if (passwordRegex.test(userPassword.val())) {
    userPassword.next().addClass('d-none')
    return true;
  } else {
    userPassword.next().removeClass('d-none');
    return false;
  }
}
/* Check the two passwords together */
function validateRePassword() {
  if (userPassword.val() == userRePassword.val()) {
    userRePassword.next().addClass('d-none')
    return true;
  } else {
    userRePassword.next().removeClass('d-none');
    return false;
  }
}


/* Contact Form validation events */

userName.on('input', function () {
  validateName();
})
userEmail.on('input', function () {
  validateEmail();
})
userPhone.on('input', function () {
  validatePhone();
})
userAge.on('input', function () {
  validateAge();
})
userPassword.on('input', function () {
  validatePassword();
})
userRePassword.on('input', function () {
  validateRePassword();
})
/* Enable the Submit button */
let contactForm = $('#contact input');
contactForm.on('input', function () {
  if (validateName() && validateEmail() && validatePhone() && validateAge() && validatePassword() && validateRePassword()) {
    submitBtn.removeClass('disabled')
  } else { submitBtn.addClass('disabled') }
})