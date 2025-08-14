import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedRecipesService } from './test/recipe/seed-recipes.service';
import { Recipe } from './test/recipe/entities/recipe.entity';
import { User } from './test/user/user.entity';
import { RecipeService } from './test/recipe/recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, User])],
  providers: [SeedRecipesService, RecipeService],
})
export class SeedModule {}
