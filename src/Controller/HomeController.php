<?php

namespace App\Controller;

use App\Repository\RecipeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class HomeController extends AbstractController
{
    public function __construct(
        private AuthenticationUtils $authenticationUtils,
        // Repository
        private RecipeRepository $recipeRepository
    ) {
    }

    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        $error = $this->authenticationUtils->getLastAuthenticationError();
        $lastUsername = $this->authenticationUtils->getLastUsername();
        return $this->render('home/index.html.twig', [
            'last_username' => $lastUsername,
            'error' => $error,
            "recipes" => $this->recipeRepository->findAll(),
        ]);
    }
}
