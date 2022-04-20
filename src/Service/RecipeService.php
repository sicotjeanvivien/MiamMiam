<?php

namespace App\Service;

use App\Entity\Ingredient;
use App\Entity\Recipe;
use App\Entity\Step;
use App\Repository\IngredientRepository;
use App\Repository\RecipeRepository;
use App\Repository\StepRepository;
use DateTime;
use Symfony\Component\Security\Core\Security;

class RecipeService
{

    public function __construct(
        // Repository
        private RecipeRepository $recipeRepository,
        private StepRepository $stepRepository,
        private IngredientRepository $ingredientRepository,
        private Security $security
    ) {
    }

    /**
     * Verifie la validiter des donnees  
     * @param object $data object renvoyer par le front 
     * @return bool 
     */
    public function checkedDataForNewRecipe(object $data): bool
    {
        $error = true;
        if (
            !property_exists($data, "name")
            || !property_exists($data, "description")
            || !property_exists($data, "time")
            || strlen($data->name) < 1
            || strlen($data->description) < 1
            || strtotime($data->time) < 1
        ) {
            $error = false;
        }
        if (!property_exists($data, "steps")) {
            foreach ($data->steps as $key => $step) {
                if (
                    !property_exists($step, "description")
                    || !property_exists($step, "number")
                    || strlen($step->description) < 1
                    || intval($step->number) < 1
                ) {
                    $error = false;
                }
            }
        }
        if (!property_exists($data, "ingredients")) {
            $error = false;
            foreach ($data->ingredients as $key => $ingredient) {
                if (
                    !property_exists($ingredient, "name")
                    || !property_exists($ingredient, "quantity")
                    || !property_exists($ingredient, "unity")
                    || strlen($ingredient->name) < 1
                    || intval($ingredient->quantity) < 1
                    || strlen($ingredient->unity) < 1
                ) {
                    $error = false;
                }
            }
        }
        return $error;
    }

    /**
     * Ajoute une nouvelle recette dans la base de donnees
     * @param object $data 
     */
    public function addNewRecipe(object $data): ?string
    {
        try {
            $recipeNew = new Recipe();
            $recipeNew
                ->setName($data->name)
                ->setDescription($data->description)
                ->setTime(new DateTime($data->time))
                ->setCreator($this->security->getUser());
            $this->recipeRepository->add($recipeNew);
            foreach ($data->steps as $key => $step) {
                $stepNew = new Step();
                $stepNew
                    ->setDescription($step->description)
                    ->setNumber($step->number)
                    ->setRecipe($recipeNew);
                $this->stepRepository->add($stepNew);
            }
            foreach ($data->ingredients as $key => $ingredient) {
                $ingredientNew = new Ingredient();
                $ingredientNew
                    ->setName($ingredient->name)
                    ->setQuantity($ingredient->quantity)
                    ->setUnity($ingredient->unity)
                    ->setRecipe($recipeNew);
                $this->ingredientRepository->add($ingredientNew);
            }
            return null;
        } catch (\Exception $ex) {
            return $ex->getMessage();
        }
    }
}
