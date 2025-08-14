import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedRecipesService } from './seed-recipes.service';
import { Recipe } from './entities/recipe.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, User])],
  providers: [SeedRecipesService],
  exports: [SeedRecipesService],
})
export class SeedingModule {}



