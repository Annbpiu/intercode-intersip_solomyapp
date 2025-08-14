import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRecipeDto: CreateRecipeDto, @Request() req) {
    return this.recipeService.create(createRecipeDto, req.user);
  }

  @Get()
  findAll() {
    return this.recipeService.getAllRecipes();
  }

  @Get('my-recipes')
  @UseGuards(JwtAuthGuard)
  findMyRecipes(@Request() req) {
    return this.recipeService.getMyRecipes(req.user.id);
  }

  @Get('search')
  search(
    @Query('q') query: string,
    @Query() filters: any,
  ) {
    return this.recipeService.searchRecipes(query, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.getRecipeById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto, @Request() req) {
    return this.recipeService.update(id, updateRecipeDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.recipeService.remove(id, req.user.id);
  }
}
