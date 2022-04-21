<?php

namespace App\Controller;

use App\Entity\Recipe;
use App\Repository\RecipeRepository;
use App\Service\RecipeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/recipe')]
class RecipeController extends AbstractController
{

    public function __construct(
        // Service
        private RecipeService $recipeService,
        //Repository
        private RecipeRepository $recipeRepository
    ) {
    }

    /**
     * PAGE CONTROLLER
     */

    #[Route('', name: 'app_recipe', methods: ["GET"])]
    public function index(): Response
    {
        return $this->render('recipe/index.html.twig', []);
    }

    #[Route('/{id}', name: 'app_recipe_show', methods: ["GET"])]
    public function show($id): Response
    {
        return $this->render('/recipe/show.html.twig', [
            'recipe' => $this->recipeRepository->find($id)
        ]);
    }

    /**
     *  AJAX CONTROLLER
     */
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
