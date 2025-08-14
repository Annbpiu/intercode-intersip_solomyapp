import {
  IsString,
  IsArray,
  IsNumber,
  IsEnum,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Unit } from '../entities/unit.enum';
import {Column} from "typeorm";

export class IngredientDto {
  @IsString()
  name: string;

  @IsString()
  amount: string;

  @IsEnum(Unit)
  unit: Unit;
}

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients: IngredientDto[];

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsNumber()
  cookingTime?: number;

  @IsOptional()
  @IsNumber()
  servings?: number;

  @IsOptional()
  @IsString()
  difficulty?: string;

  @IsOptional()
  @IsString()
  image?: string;
}
