import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { User } from '../user/user.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto, user: User): Promise<Recipe> {
    const recipe = this.recipeRepository.create({
      ...createRecipeDto,
      author: user,
    });

    return this.recipeRepository.save(recipe);
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .select([
        'recipe.id',
        'recipe.title',
        'recipe.content',
        'recipe.instructions',
        'recipe.ingredients',
        'recipe.cookingTime',
        'recipe.servings',
        'recipe.difficulty',
        'recipe.image',
        'recipe.createdAt',
        'author.id',
        'author.email',
        'author.name',
      ])
      .orderBy('recipe.createdAt', 'DESC')
      .getMany();
  }

  async getRecipeById(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .where('recipe.id = :id', { id })
      .select([
        'recipe.id',
        'recipe.title',
        'recipe.content',
        'recipe.instructions',
        'recipe.ingredients',
        'recipe.cookingTime',
        'recipe.servings',
        'recipe.difficulty',
        'recipe.image',
        'recipe.createdAt',
        'author.id',
        'author.email',
        'author.name',
      ])
      .getOne();

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe;
  }

  async update(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
    userId: string,
  ): Promise<Recipe> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .where('recipe.id = :id', { id })
      .getOne();

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.author.id !== userId) {
      throw new ForbiddenException('You can only update your own recipes');
    }

    Object.assign(recipe, updateRecipeDto);
    return this.recipeRepository.save(recipe);
  }

  async remove(id: string, userId: string): Promise<void> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .where('recipe.id = :id', { id })
      .getOne();

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    if (recipe.author.id !== userId) {
      throw new ForbiddenException('You can only delete your own recipes');
    }

    await this.recipeRepository.remove(recipe);
  }

  async getMyRecipes(userId: string): Promise<Recipe[]> {
    return this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .where('recipe.author.id = :userId', { userId })
      .select([
        'recipe.id',
        'recipe.title',
        'recipe.content',
        'recipe.instructions',
        'recipe.ingredients',
        'recipe.cookingTime',
        'recipe.servings',
        'recipe.difficulty',
        'recipe.createdAt',
        'author.id',
        'author.email',
        'author.name',
      ])
      .orderBy('recipe.createdAt', 'DESC')
      .getMany();
  }

  async searchRecipes(query: string, filters: any = {}): Promise<Recipe[]> {
    const queryBuilder = this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.author', 'author')
      .select([
        'recipe.id',
        'recipe.title',
        'recipe.content',
        'recipe.ingredients',
        'recipe.cookingTime',
        'recipe.servings',
        'recipe.difficulty',
        'recipe.image',
        'recipe.createdAt',
        'author.id',
        'author.email',
        'author.name',
      ]);

    if (query) {
      queryBuilder.andWhere(
        '(recipe.title ILIKE :query OR recipe.content ILIKE :query)',
        { query: `%${query}%` },
      );
    }

    if (filters.difficulty && filters.difficulty !== 'all') {
      queryBuilder.andWhere('recipe.difficulty = :difficulty', {
        difficulty: filters.difficulty,
      });
    }

    return queryBuilder.orderBy('recipe.createdAt', 'DESC').getMany();
  }
}
