window.addEventListener('load', () => {
    document.getElementById("js_recipe_form_step_plus").addEventListener("click", (e) => addStepRecipe(e));
    document.getElementById("js_recipe_form_ingredient_plus").addEventListener("click", (e) => addIngredientRecipe(e));
    document.querySelector("#js_recipe_create").addEventListener("click", (e) => createNewRecipe(e))
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
                <input type="text" class="form-control js_step_form_description" value="`+ element.description + `" id="js_step_form_description` + element.number + `">
                <div id="js_step_form_description_error` + element.number + `"" class="invalid-feedback">
        		    Veuillez remplir le champs... 
			    </div>
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

// RECIPE INGREDIENT

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
                <input type="text" class="form-control js_ingredient_form" value="`+ element.name + `" id="js_ingredient_form_name` + element.number + `">
                <div id="js_ingredient_form_name_error` + element.number + `"" class="invalid-feedback">
        		    Veuillez remplir le champs... 
			    </div>
            </div>
            <div class="mb-3 col-4">
                <label for="js_ingredient_form_quantity" class="form-label">Quantié</label>
                <input type="text" value="` + element.quantity + `" class="form-control js_ingredient_form" id="js_ingredient_form_quantity` + element.number + `">
                <div id="js_ingredient_form_quantity_error` + element.number + `"" class="invalid-feedback">
        		    Veuillez remplir le champs... 
			    </div>
            </div>
            <div class="mb-3 col-2">
                <label for="js_ingredient_form_unity" class="form-label">Unité</label>
                <input type="text" class="form-control js_ingredient_form" value="`+ element.unity + `" id="js_ingredient_form_unity` + element.number + `">
                <div id="js_ingredient_form_unity_error` + element.number + `"" class="invalid-feedback">
        		    Veuillez remplir le champs... 
			    </div>
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

// RECIPE

const createNewRecipe = (e) => {
    e.preventDefault();
    document.getElementById("js_recipe_form_fetch_response").classList.remove("alert", "alert-success", "alert-danger");
    document.getElementById("js_recipe_form_fetch_response").innerHTML = "";
    let url = window.routes.recipe.create;

    let data = {
        "name": document.querySelector("#js_recipe_form_name").value,
        "description": document.querySelector("#js_recipe_form_description").value,
        "time": document.querySelector("#js_recipe_form_time").value,
        "steps": window.step,
        "ingredients": window.ingredient
    };

    if (check_data_for_new_recipe(data)) {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
        }).then(res => res.json()).then(res => {
            let className = "alert-danger";
            if (res.resp === "success") { 
                className = "alert-success";
                location.assign(location.origin); 
            }
            document.getElementById("js_recipe_form_fetch_response").classList.add("alert", className);
            document.getElementById("js_recipe_form_fetch_response").innerHTML = res.message;

        }).catch(error => {
            alert(error);
        })
    }
}

const check_data_for_new_recipe = (data) => {
    let error = true;
    document.querySelectorAll("input").forEach(elem => {
        elem.classList.remove("is-invalid");
        elem.classList.add("is-valid");
    });
    if (!data.name || data.name.length < 1) {
        error = false;
        document.querySelector("#js_recipe_form_name").classList.remove("is-valid");
        document.querySelector("#js_recipe_form_name").classList.add("is-invalid");
    }
    if (!data.description || data.description.length < 1) {
        error = false;
        document.querySelector("#js_recipe_form_description").classList.remove("is-valid");
        document.querySelector("#js_recipe_form_description").classList.add("is-invalid");
    }
    if (!data.time || data.time < 1) {
        error = false;
        document.querySelector("#js_recipe_form_time").classList.remove("is-valid");
        document.querySelector("#js_recipe_form_time").classList.add("is-invalid");
    }
    if (data.steps.length > 0) {
        data.steps.forEach(elem => {
            if (!elem.description || elem.description.length < 1) {
                error = false;
                document.querySelector("#js_step_form_description" + elem.number).classList.remove("is-valid");
                document.querySelector("#js_step_form_description" + elem.number).classList.add("is-invalid");
            }
        })
    }
    if (data.ingredients.length > 0) {
        data.ingredients.forEach(elem => {
            if (!elem.name || elem.name.length < 1) {
                error = false;
                document.querySelector("#js_ingredient_form_name" + elem.number).classList.remove("is-valid");
                document.querySelector("#js_ingredient_form_name" + elem.number).classList.add("is-invalid");
            }
            if (!elem.quantity || elem.quantity.length < 1) {
                error = false;
                document.querySelector("#js_ingredient_form_quantity" + elem.number).classList.remove("is-valid");
                document.querySelector("#js_ingredient_form_quantity" + elem.number).classList.add("is-invalid");
            }
            if (!elem.unity || elem.unity.length < 1) {
                error = false;
                document.querySelector("#js_ingredient_form_unity" + elem.number).classList.remove("is-valid");
                document.querySelector("#js_ingredient_form_unity" + elem.number).classList.add("is-invalid");
            }
        })
    }
    return error;
}