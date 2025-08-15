import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedRecipesService } from './test/recipe/seed-recipes.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  try {
    const seedService = app.get(SeedRecipesService);
    await seedService.seedRecipes();
    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await app.close();
  }
}

seed();




