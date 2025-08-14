import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { User } from '../user/user.entity';
import { Unit } from './entities/unit.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedRecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seedRecipes() {
    const users = await this.createTestUsers();

    const mockRecipes = [
      {
        title: 'Classic Margherita Pizza',
        content:
            'A traditional Italian pizza with fresh mozzarella, basil, and tomato sauce. This simple yet delicious recipe showcases the perfect balance of flavors that has made Margherita pizza a worldwide favorite.',
        ingredients: [
          { name: 'Pizza dough', amount: '1', unit: Unit.BALL },
          { name: 'Fresh mozzarella', amount: '200', unit: Unit.GRAM },
          { name: 'Fresh basil leaves', amount: '10-12', unit: Unit.LEAVES },
          { name: 'Tomato sauce', amount: '1/2', unit: Unit.CUP },
          { name: 'Olive oil', amount: '2', unit: Unit.TABLESPOON },
          { name: 'Salt', amount: '1/2', unit: Unit.TEASPOON },
        ],
        author: users[0],
        cookingTime: 25,
        servings: 4,
        difficulty: 'medium',
      },
      {
        title: 'Chocolate Chip Cookies',
        content:
            'Soft and chewy chocolate chip cookies with crispy edges. These classic cookies are perfect for any occasion and will fill your home with the wonderful aroma of freshly baked cookies.',
        ingredients: [
          { name: 'All-purpose flour', amount: '2 1/4', unit: Unit.CUP },
          { name: 'Butter', amount: '1', unit: Unit.CUP },
          { name: 'Brown sugar', amount: '3/4', unit: Unit.CUP },
          { name: 'White sugar', amount: '3/4', unit: Unit.CUP },
          { name: 'Eggs', amount: '2', unit: Unit.LARGE },
          { name: 'Vanilla extract', amount: '1', unit: Unit.TEASPOON },
          { name: 'Chocolate chips', amount: '2', unit: Unit.CUP },
          { name: 'Baking soda', amount: '1', unit: Unit.TEASPOON },
          { name: 'Salt', amount: '1/2', unit: Unit.TEASPOON },
        ],
        author: users[1],
        cookingTime: 15,
        servings: 24,
        difficulty: 'easy',
      },
      {
        title: 'Beef Stir Fry',
        content:
            'A quick and flavorful beef stir fry with colorful vegetables. This dish is perfect for busy weeknights and can be customized with your favorite vegetables and sauces.',
        ingredients: [
          { name: 'Beef sirloin', amount: '500', unit: Unit.GRAM },
          { name: 'Broccoli', amount: '2', unit: Unit.CUP },
          { name: 'Bell peppers', amount: '2', unit: Unit.MEDIUM },
          { name: 'Soy sauce', amount: '3', unit: Unit.TABLESPOON },
          { name: 'Garlic', amount: '4', unit: Unit.CLOVES },
          { name: 'Ginger', amount: '1', unit: Unit.TABLESPOON },
          { name: 'Vegetable oil', amount: '2', unit: Unit.TABLESPOON },
          { name: 'Cornstarch', amount: '1', unit: Unit.TABLESPOON },
        ],
        author: users[2],
        cookingTime: 20,
        servings: 4,
        difficulty: 'medium',
      },
      {
        title: 'French Onion Soup',
        content:
            'A rich and comforting French onion soup with caramelized onions, beef broth, and melted Gruyère cheese. This classic soup is perfect for cold winter days and special occasions.',
        ingredients: [
          { name: 'Yellow onions', amount: '6', unit: Unit.LARGE },
          { name: 'Beef broth', amount: '8', unit: Unit.CUP },
          { name: 'Butter', amount: '4', unit: Unit.TABLESPOON },
          { name: 'Gruyère cheese', amount: '200', unit: Unit.GRAM },
          { name: 'Baguette', amount: '1', unit: Unit.LOAF },
          { name: 'White wine', amount: '1/2', unit: Unit.CUP },
          { name: 'Thyme', amount: '1', unit: Unit.TEASPOON },
          { name: 'Bay leaves', amount: '2', unit: Unit.LEAVES },
        ],
        author: users[3],
        cookingTime: 90,
        servings: 6,
        difficulty: 'hard',
      },
      {
        title: 'Avocado Toast',
        content:
            'A simple and nutritious breakfast option featuring creamy avocado on toasted bread. Customize with your favorite toppings like eggs, tomatoes, or microgreens for a satisfying morning meal.',
        ingredients: [
          { name: 'Bread', amount: '2', unit: Unit.SLICES },
          { name: 'Ripe avocado', amount: '1', unit: Unit.MEDIUM },
          { name: 'Lemon juice', amount: '1/2', unit: Unit.LEMON },
          { name: 'Red pepper flakes', amount: '1/4', unit: Unit.TEASPOON },
          { name: 'Salt', amount: '1/4', unit: Unit.TEASPOON },
          { name: 'Black pepper', amount: '1/4', unit: Unit.TEASPOON },
          { name: 'Olive oil', amount: '1', unit: Unit.TABLESPOON },
        ],
        author: users[4],
        cookingTime: 10,
        servings: 1,
        difficulty: 'easy',
      },
      {
        title: 'Spaghetti Carbonara',
        content:
            'A creamy Italian pasta dish made with eggs, cheese, pancetta, and pepper. Quick, delicious, and perfect for a cozy dinner.',
        ingredients: [
          { name: 'Spaghetti', amount: '400', unit: Unit.GRAM },
          { name: 'Pancetta', amount: '150', unit: Unit.GRAM },
          { name: 'Eggs', amount: '4', unit: Unit.LARGE },
          { name: 'Parmesan cheese', amount: '100', unit: Unit.GRAM },
          { name: 'Black pepper', amount: '1', unit: Unit.TEASPOON },
          { name: 'Salt', amount: '1', unit: Unit.TEASPOON },
        ],
        author: users[0],
        cookingTime: 20,
        servings: 4,
        difficulty: 'medium',
      },
      {
        title: 'Caesar Salad',
        content:
            'A fresh and crunchy salad with romaine lettuce, croutons, Parmesan cheese, and a tangy Caesar dressing.',
        ingredients: [
          { name: 'Romaine lettuce', amount: '1', unit: Unit.HEAD },
          { name: 'Croutons', amount: '1', unit: Unit.CUP },
          { name: 'Parmesan cheese', amount: '50', unit: Unit.GRAM },
          { name: 'Caesar dressing', amount: '1/2', unit: Unit.CUP },
          { name: 'Black pepper', amount: '1/4', unit: Unit.TEASPOON },
        ],
        author: users[1],
        cookingTime: 10,
        servings: 2,
        difficulty: 'easy',
      },
      {
        title: 'Vegetable Curry',
        content:
            'A fragrant and mildly spiced curry loaded with seasonal vegetables, perfect with rice or naan bread.',
        ingredients: [
          { name: 'Potatoes', amount: '2', unit: Unit.MEDIUM },
          { name: 'Carrots', amount: '2', unit: Unit.MEDIUM },
          { name: 'Peas', amount: '1', unit: Unit.CUP },
          { name: 'Coconut milk', amount: '1', unit: Unit.CAN },
          { name: 'Curry powder', amount: '2', unit: Unit.TABLESPOON },
          { name: 'Onion', amount: '1', unit: Unit.MEDIUM },
          { name: 'Garlic', amount: '3', unit: Unit.CLOVES },
        ],
        author: users[2],
        cookingTime: 35,
        servings: 4,
        difficulty: 'medium',
      },
      {
        title: 'Pancakes',
        content:
            'Fluffy and light pancakes perfect for breakfast, served with syrup or fresh fruit.',
        ingredients: [
          { name: 'All-purpose flour', amount: '1 1/2', unit: Unit.CUP },
          { name: 'Milk', amount: '1 1/4', unit: Unit.CUP },
          { name: 'Egg', amount: '1', unit: Unit.LARGE },
          { name: 'Butter', amount: '3', unit: Unit.TABLESPOON },
          { name: 'Baking powder', amount: '3 1/2', unit: Unit.TEASPOON },
          { name: 'Salt', amount: '1/4', unit: Unit.TEASPOON },
          { name: 'Sugar', amount: '1', unit: Unit.TABLESPOON },
        ],
        author: users[3],
        cookingTime: 15,
        servings: 4,
        difficulty: 'easy',
      },
      {
        title: 'Grilled Salmon',
        content:
            'A healthy and flavorful dish with salmon fillets grilled to perfection, served with lemon and herbs.',
        ingredients: [
          { name: 'Salmon fillets', amount: '4', unit: Unit.PIECE },
          { name: 'Lemon', amount: '1', unit: Unit.MEDIUM },
          { name: 'Olive oil', amount: '2', unit: Unit.TABLESPOON },
          { name: 'Salt', amount: '1/2', unit: Unit.TEASPOON },
          { name: 'Black pepper', amount: '1/2', unit: Unit.TEASPOON },
        ],
        author: users[4],
        cookingTime: 20,
        servings: 4,
        difficulty: 'easy',
      },
    ];

    for (const recipeData of mockRecipes) {
      const existingRecipe = await this.recipeRepository.findOne({
        where: { title: recipeData.title },
      });

      if (!existingRecipe) {
        const recipe = this.recipeRepository.create(recipeData);
        await this.recipeRepository.save(recipe);
        console.log(`Created recipe: ${recipe.title}`);
      }
    }

    console.log('Recipes seeding completed!');
  }

  private async createTestUsers(): Promise<User[]> {
    const testUsers = [
      {
        email: 'baker.sarah@example.com',
        password: 'password123',
        name: 'Sarah Baker',
      },
      {
        email: 'chef.wei@example.com',
        password: 'password123',
        name: 'Chef Wei',
      },
      {
        email: 'chef.pierre@example.com',
        password: 'password123',
        name: 'Chef Pierre',
      },
      {
        email: 'health.lisa@example.com',
        password: 'password123',
        name: 'Lisa Health',
      },
    ];

    const users: User[] = [];
    const saltRounds = 10;

    for (const userData of testUsers) {
      let user = await this.userRepository.findOne({
        where: { email: userData.email },
      });

      if (!user) {
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
        user = this.userRepository.create({
          ...userData,
          password: hashedPassword,
        });
        await this.userRepository.save(user);
        console.log(`Created user: ${user.email}`);
      }

      users.push(user);
    }

    return users;
  }
}
