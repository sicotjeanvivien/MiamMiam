<?php

namespace App\Entity;

use App\Entity\trait\CommonAttributesTrait;
use App\Repository\CommentRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\HasLifecycleCallbacks;

#[ORM\Entity(repositoryClass: CommentRepository::class)]
#[HasLifecycleCallbacks]
class Comment
{

    use CommonAttributesTrait;

    #[ORM\Column(type: 'text', nullable: true)]
    private $content;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'comments')]
    private $creator;

    #[ORM\ManyToOne(targetEntity: Recipe::class, inversedBy: 'comments')]
    private $recipe;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    public function getRecipe(): ?Recipe
    {
        return $this->recipe;
    }

    public function setRecipe(?Recipe $recipe): self
    {
        $this->recipe = $recipe;

        return $this;
    }
}
