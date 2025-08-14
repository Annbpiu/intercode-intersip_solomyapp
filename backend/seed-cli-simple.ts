import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Recipe } from './src/test/recipe/entities/recipe.entity';
import { User } from './src/test/user/user.entity';
import { SeedRecipesService } from './src/test/recipe/seed-recipes.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '142434',
      database: 'postgres',
      entities: [Recipe, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Recipe, User]),
  ],
  providers: [SeedRecipesService],
})
class SeedingSimpleModule {}

async function seed() {
  let app;
  try {
    console.log('🌱 Starting simple recipes seeding...');
    app = await NestFactory.createApplicationContext(SeedingSimpleModule);
    console.log('✅ Simple app context created');

    const seedService = app.get(SeedRecipesService);
    await seedService.seedRecipes();

    console.log('✅ Recipes seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during simple seeding:', error);
    process.exit(1);
  } finally {
    if (app) await app.close();
  }
}

seed();
