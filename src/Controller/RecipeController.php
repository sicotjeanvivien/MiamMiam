<?php

namespace App\Controller;

use App\Service\RecipeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RecipeController extends AbstractController
{

    public function __construct(
        // Service
        private RecipeService $recipeService
    ) {
    }

    #[Route('/recipe', name: 'app_recipe', methods: ["GET"])]
    public function index(): Response
    {
        return $this->render('recipe/index.html.twig', []);
    }

    #[Route('recipe/create', name: "app_recipe_create", methods: ["POST"])]
    public function add(Request $request): Response
    {
        if ($data = json_decode($request->getContent())) {
            $response = [
                "resp" => "error",
                "message" => "Données invalides"
            ];
            if ($this->recipeService->checkedDataForNewRecipe($data)) {
                $response["message"] = $this->recipeService->addNewRecipe($data);
                empty($response["message"]) &&  $response = ["resp" => "success", "message" => "Recette créée"];
            }
            return $this->json($response, 200);
        }
        throw new JsonException("error", 404);
    }
}
