const searhBtn=document.querySelector(".input .btn1");
const mealList=document.querySelector("#meal");
const mealDetailsContent=document.querySelector(".meal-details-content")
const closeButton=document.querySelector("#close-btn")

searhBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealReceipe);
closeButton.addEventListener("click", ()=>{
    mealDetailsContent.parentElement.classList.remove("showRecipe")
})
document.querySelector(".input input").addEventListener("input", function(){
    searhBtn.removeAttribute("disabled");
})
function getMealList(){
   let a= document.querySelector(".input input").value.trim();
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${a}`).then(response => response.json()).then(data=>{
    console.log(data)
    let html="";
    if(data.meals){
        data.meals.forEach(meal=>{
            html+=`<div class="meal-item col-5 a" data-id = "${meal.idMeal}">
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="image">
            </div>
            <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="" class="recipe-btn">Get Recipe</a>
            </div>
        </div>`
        })
    }
    else{
        html="sorry! We Can't Find Any Meal."
        mealList.classList.add("notFound");
    }
    mealList.innerHTML = html;
   });
}

function getMealReceipe(e){
    e.preventDefault();
    if(e.target.classList.contains("recipe-btn")){
        let mealItem=e.target.parentElement.parentElement;
        // console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response=> response.json()).then(data=>mealModal(data.meals));
    } 
}
function mealModal(meal){
    // console.log(meal);
    meal=meal[0];
    let html=`
    <h3 class="recipe-title">${meal.strMeal}</h3>
    <p class="recipe-category">${meal.strCategory}</p>

    <div class="recipe-instruction">
        <h4>Instructions:</h4>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="image">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube} target="_blank">Watch Video</a>
    </div>`;
    mealDetailsContent.innerHTML=html; 
    mealDetailsContent.parentElement.classList.add("showRecipe"); 
}
/* document.querySelector(".close-btn").addEventListener("click", function(){
document.querySelector(".meal-details").style.display="none"
}) */