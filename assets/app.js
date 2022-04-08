/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';
import { async } from 'regenerator-runtime';

window.addEventListener('load', () => {
    document.getElementById("js_recipe_form_step_plus").addEventListener("click", (e) => addStepRecipe(e));
    document.getElementById("js_recipe_form_ingredient_plus").addEventListener("click", (e) => addIngredientRecipe(e));
    window.step = [];
    window.ingredient = [];

})


// RECIPE STEP

const addStepRecipe = (e) => {
    e.preventDefault();
    updateStepDescription();
    let lengthStep = window.step.length;
    window.step.push({
        "number": lengthStep + 1,
        "description": ""
    });
    generateRenderViewStep();
}

const deleteStepRecipe = (e) => {
    e.preventDefault();
    let number = e.currentTarget.dataset.number;
    let step = [];
    let newStepNumber = 1;
    window.step.map((elem, key) => {
        if (parseInt(elem.number) !== parseInt(number)) {
            step.push({
                "number": newStepNumber,
                "description": elem.description
            });
            newStepNumber++;
        }
    });
    window.step = step;
    generateRenderViewStep();
}

const updateStepDescription = () => {
    let steps = [];
    window.step.forEach((elem, key) => {
        steps.push({
            "number": elem.number,
            "description": document.querySelector("#js_step_form_description" + elem.number).value
        })
    })
    window.step = steps;
    console.log(window.step);
}

const generateRenderViewStep = () => {
    let renderView = "";
    window.step.forEach(element => {
        renderView += `
        <div class="row">
            <div class="mb-3 col-2">
                <label for="js_step_form_number" class="form-label">N° étape</label>
                <input type="text" value="` + element.number + `" class="form-control" id="js_step_form_number"  disabled>
            </div>
            <div class="mb-3 col-8">
                <label for="js_step_form_description" class="form-label">Description</label>
                <input type="text" class="form-control js_step_form_description" value="`+ element.description +`" id="js_step_form_description` + element.number + `">
            </div>
            <div class="mb-3 col-2 d-flex align-items-end">
                <button class="btn btn-danger js_step_deleted" id="" data-number="` + element.number + `"><i class="bi bi-trash"></i></button>
            </div>
        </div>
        `;
    });
    document.getElementById("js_recipe_form_step").innerHTML = renderView;

    document.querySelectorAll(".js_step_deleted").forEach((element, key) => {
        element.addEventListener("click", (e) => deleteStepRecipe(e));
    });
    document.querySelectorAll(".js_step_form_description").forEach((element, key) => {
        element.addEventListener("change", (e) => updateStepDescription());
    });

}

// INGREDIENT

const addIngredientRecipe = (e) => {
    e.preventDefault();
    updateIngredientDescription();
    let lengthIngredient = window.ingredient.length;
    window.ingredient.push({
        "number": lengthIngredient + 1,
        "name": "",
        "quantity": "",
        "unity": ""
    });
    generateRenderViewIngredient();
}

const deleteIngredientRecipe = (e) => {
    e.preventDefault();
    let number = e.currentTarget.dataset.number;
    let ingredients = [];
    let newIngredientNumber = 1;
    window.ingredient.map((elem, key) => {
        if (parseInt(elem.number) !== parseInt(number)) {
            ingredients.push({
                "number": newIngredientNumber,
                "name": elem.name,
                "quantity": elem.quantity,
                "unity": elem.unity
            });
            newIngredientNumber++;
        }
    });
    window.ingredient = ingredients;
    generateRenderViewIngredient();
}

const updateIngredientDescription = () => {
    let ingredients = [];
    window.ingredient.forEach((elem, key) => {
        ingredients.push({
            "number": elem.number,
            "name": document.querySelector("#js_ingredient_form_name" + elem.number).value,
            "quantity": document.querySelector("#js_ingredient_form_quantity" + elem.number).value,
            "unity": document.querySelector("#js_ingredient_form_unity" + elem.number).value
        })
    })
    window.ingredient = ingredients;
    console.log(window.ingredient);
}

const generateRenderViewIngredient = () => {
    let renderView = "";
    window.ingredient.forEach(element => {
        renderView += `
        <div class="row">
            <div class="mb-3 col-4">
                <label for="js_ingredient_form_name" class="form-label">Nom</label>
                <input type="text" class="form-control js_ingredient_form" value="`+ element.name +`" id="js_ingredient_form_name` + element.number + `">
            </div>
            <div class="mb-3 col-4">
                <label for="js_ingredient_form_quantity" class="form-label">Quantié</label>
                <input type="text" value="` + element.quantity + `" class="form-control js_ingredient_form" id="js_ingredient_form_quantity` + element.number + `">
            </div>
            <div class="mb-3 col-2">
                <label for="js_ingredient_form_unity" class="form-label">Unité</label>
                <input type="text" class="form-control js_ingredient_form" value="`+ element.unity +`" id="js_ingredient_form_unity` + element.number + `">
            </div>
            <div class="mb-3 col-2 d-flex align-items-end">
                <button class="btn btn-danger js_ingredient_deleted" id="" data-number="` + element.number + `"><i class="bi bi-trash"></i></button>
            </div>
        </div>
        `;
    });
    document.getElementById("js_recipe_form_ingredient").innerHTML = renderView;

    document.querySelectorAll(".js_ingredient_deleted").forEach((element, key) => {
        element.addEventListener("click", (e) => deleteIngredientRecipe(e));
    });
    document.querySelectorAll(".js_ingredient_form").forEach((element, key) => {
        element.addEventListener("change", (e) => updateIngredientDescription());
    });

}